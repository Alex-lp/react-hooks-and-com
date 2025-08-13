import { useEffect, useRef, useState, useCallback } from 'react';
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
export const usePolling = (callback, options) => {
    const { interval, immediate = false, enabled = true, maxRetries = -1, onError, onSuccess } = options;
    const [isPolling, setIsPolling] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const intervalRef = useRef(null);
    const callbackRef = useRef(callback);
    // 更新回调函数引用
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    const executeCallback = useCallback(async () => {
        try {
            setError(null);
            const result = await callbackRef.current();
            setData(result);
            setRetryCount(0);
            onSuccess?.(result);
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setError(error);
            setRetryCount(prev => prev + 1);
            onError?.(error);
            // 如果达到最大重试次数，停止轮询
            if (maxRetries > 0 && retryCount >= maxRetries) {
                stop();
            }
        }
    }, [maxRetries, retryCount, onSuccess, onError]);
    const start = useCallback(() => {
        if (!enabled || isPolling)
            return;
        setIsPolling(true);
        setRetryCount(0);
        setError(null);
        // 立即执行一次
        executeCallback();
        // 设置定时器
        intervalRef.current = setInterval(executeCallback, interval);
    }, [enabled, isPolling, interval, executeCallback]);
    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsPolling(false);
    }, []);
    const restart = useCallback(() => {
        stop();
        start();
    }, [stop, start]);
    // 初始化
    useEffect(() => {
        if (immediate && enabled) {
            start();
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [immediate, enabled, start]);
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
//# sourceMappingURL=usePolling.js.map