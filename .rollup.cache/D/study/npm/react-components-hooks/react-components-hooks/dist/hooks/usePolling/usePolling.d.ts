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
export declare const usePolling: (callback: () => Promise<any> | void, options: UsePollingOptions) => UsePollingReturn;
//# sourceMappingURL=usePolling.d.ts.map