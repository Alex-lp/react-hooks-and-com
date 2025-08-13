export interface UseEventBusOptions {
    /** 是否在组件卸载时自动清理事件监听器 */
    autoCleanup?: boolean;
    /** 事件总线实例（可选，默认使用全局实例） */
    eventBus?: Map<string, Set<Function>>;
}
export interface UseEventBusReturn {
    /** 监听事件 */
    on: (callback: Function) => () => void;
    /** 监听事件（只执行一次） */
    once: (callback: Function) => () => void;
    /** 触发事件 */
    emit: (data?: any) => void;
    /** 移除事件监听器 */
    off: (callback: Function) => void;
    /** 清空所有事件监听器 */
    reset: () => void;
    /** 获取当前事件监听器数量 */
    listenerCount: () => number;
}
/**
 * 事件总线 Hook
 * 提供组件间的事件通信功能
 *
 * @param eventName 事件名称
 * @param options 配置选项
 * @returns 返回事件总线操作方法
 *
 * @example
 * ```tsx
 * const { on, emit, off, reset } = useEventBus('user-login');
 *
 * useEffect(() => {
 *   const unsubscribe = on((userData) => {
 *     console.log('用户登录:', userData);
 *   });
 *
 *   return unsubscribe; // 自动清理
 * }, [on]);
 *
 * const handleLogin = () => {
 *   emit({ id: 1, name: 'John' });
 * };
 *
 * return (
 *   <div>
 *     <button onClick={handleLogin}>登录</button>
 *     <button onClick={reset}>清空所有监听器</button>
 *   </div>
 * );
 * ```
 */
export declare const useEventBus: (eventName: string, options?: UseEventBusOptions) => UseEventBusReturn;
//# sourceMappingURL=useEventBus.d.ts.map