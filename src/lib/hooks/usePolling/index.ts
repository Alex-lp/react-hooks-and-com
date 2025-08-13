import { useEffect, useRef, useState, useCallback } from 'react';

export interface UsePollingOptions {
  /** 轮询间隔（毫秒） */
  interval: number;
  /** 是否立即开始轮询 */
  immediate?: boolean;
  /** 是否启用轮询 */
  enabled?: boolean;
  /** 最大重试次数 */
  maxRetries?: number;
  /** 轮询失败时的回调 */
  onError?: (error: Error) => void;
  /** 轮询成功时的回调 */
  onSuccess?: (data: any) => void;
}

export interface UsePollingReturn {
  /** 是否正在轮询 */
  isPolling: boolean;
  /** 开始轮询 */
  start: () => void;
  /** 停止轮询 */
  stop: () => void;
  /** 重启轮询 */
  restart: () => void;
  /** 当前重试次数 */
  retryCount: number;
  /** 最后执行的错误 */
  error: Error | null;
  /** 最后执行的结果 */
  data: any;
}

/**
 * 轮询 Hook
 * 用于定期执行回调函数，常用于获取远程数据或检查任务状态
 * 
 * @param callback 要执行的回调函数
 * @param options 配置选项
 * @returns 返回轮询控制方法和状态
 * 
 * @example
 * ```tsx
 * const { isPolling, start, stop, error, data } = usePolling(
 *   async () => {
 *     const response = await fetch('/api/status');
 *     return response.json();
 *   },
 *   {
 *     interval: 5000,
 *     immediate: true,
 *     onSuccess: (data) => console.log('轮询成功:', data),
 *     onError: (error) => console.error('轮询失败:', error)
 *   }
 * );
 * 
 * return (
 *   <div>
 *     <button onClick={start} disabled={isPolling}>开始轮询</button>
 *     <button onClick={stop} disabled={!isPolling}>停止轮询</button>
 *     <p>状态: {isPolling ? '轮询中' : '已停止'}</p>
 *     {error && <p>错误: {error.message}</p>}
 *     {data && <p>数据: {JSON.stringify(data)}</p>}
 *   </div>
 * );
 * ```
 */
export const usePolling = (
  callback: () => Promise<any> | void,
  options: UsePollingOptions
): UsePollingReturn => {
  const {
    interval,
    immediate = false,
    enabled = true,
    maxRetries = -1,
    onError,
    onSuccess
  } = options;

  const [isPolling, setIsPolling] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);
  const optionsRef = useRef({ maxRetries, onError, onSuccess });
  const isPollingRef = useRef(false);

  // 更新回调函数引用和选项引用
  useEffect(() => {
    callbackRef.current = callback;
    optionsRef.current = { maxRetries, onError, onSuccess };
  }, [callback, maxRetries, onError, onSuccess]);

  // 执行回调函数
  const executeCallback = useCallback(async () => {
    if (!isPollingRef.current) return; // 使用 ref 检查轮询状态
    
    try {
      setError(null);
      const result = await callbackRef.current();
      setData(result);
      setRetryCount(0);
      optionsRef.current.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setRetryCount(prev => {
        const newCount = prev + 1;
        // 如果达到最大重试次数，停止轮询
        if (optionsRef.current.maxRetries > 0 && newCount >= optionsRef.current.maxRetries) {
          // 直接停止，避免依赖问题
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsPolling(false);
          isPollingRef.current = false;
        }
        return newCount;
      });
      optionsRef.current.onError?.(error);
    }
  }, []); // 移除所有依赖

  // 停止轮询
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
    isPollingRef.current = false;
  }, []);

  // 开始轮询
  const start = useCallback(() => {
    if (isPollingRef.current) return;

    setIsPolling(true);
    isPollingRef.current = true;
    setRetryCount(0);
    setError(null);

    // 立即执行一次
    executeCallback();

    // 设置定时器
    intervalRef.current = setInterval(() => {
      executeCallback();
    }, interval);
  }, [interval, executeCallback]);

  // 重启轮询
  const restart = useCallback(() => {
    stop();
    setTimeout(() => start(), 0);
  }, [stop, start]);

  // 初始化 - 只有在 immediate=true 且 enabled=true 时才自动开始
  useEffect(() => {
    if (immediate && enabled) {
      start();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // 只在组件挂载时执行一次

  // 清理
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isPolling,
    start,
    stop,
    restart,
    retryCount,
    error,
    data
  };
};
