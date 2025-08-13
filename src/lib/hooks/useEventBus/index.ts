import { useCallback, useRef, useEffect } from 'react';

// 全局事件映射
const globalEventsMap = new Map<string, Set<Function>>();

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
export const useEventBus = (
  eventName: string,
  options: UseEventBusOptions = {}
): UseEventBusReturn => {
  const {
    autoCleanup = true,
    eventBus = globalEventsMap
  } = options;

  const eventsRef = useRef(eventBus);
  const cleanupRefs = useRef<Set<Function>>(new Set());

  // 获取或创建事件监听器集合
  const getEventListeners = useCallback(() => {
    if (!eventsRef.current.has(eventName)) {
      eventsRef.current.set(eventName, new Set());
    }
    return eventsRef.current.get(eventName)!;
  }, [eventName]);

  // 监听事件
  const on = useCallback((callback: Function) => {
    const listeners = getEventListeners();
    listeners.add(callback);
    cleanupRefs.current.add(callback);

    // 返回取消订阅函数
    return () => {
      listeners.delete(callback);
      cleanupRefs.current.delete(callback);
    };
  }, [getEventListeners]);

  // 监听事件（只执行一次）
  const once = useCallback((callback: Function) => {
    const onceCallback = (data: any) => {
      callback(data);
      off(onceCallback);
    };
    return on(onceCallback);
  }, [on]);

  // 触发事件
  const emit = useCallback((data?: any) => {
    const listeners = getEventListeners();
    listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error('EventBus callback error:', error);
      }
    });
  }, [getEventListeners]);

  // 移除事件监听器
  const off = useCallback((callback: Function) => {
    const listeners = getEventListeners();
    listeners.delete(callback);
    cleanupRefs.current.delete(callback);
  }, [getEventListeners]);

  // 清空所有事件监听器
  const reset = useCallback(() => {
    const listeners = getEventListeners();
    listeners.clear();
    cleanupRefs.current.clear();
  }, [getEventListeners]);

  // 获取当前事件监听器数量
  const listenerCount = useCallback(() => {
    const listeners = getEventListeners();
    return listeners.size;
  }, [getEventListeners]);

  // 自动清理
  useEffect(() => {
    if (!autoCleanup) return;

    return () => {
      const listeners = getEventListeners();
      cleanupRefs.current.forEach((callback) => {
        listeners.delete(callback);
      });
      cleanupRefs.current.clear();
    };
  }, [autoCleanup, getEventListeners]);

  return {
    on,
    once,
    emit,
    off,
    reset,
    listenerCount
  };
};
