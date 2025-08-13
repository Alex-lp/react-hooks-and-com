import { useEffect, useLayoutEffect, useRef, RefObject } from 'react';

export interface UseClickAwayOptions {
  /** 是否启用点击外部检测 */
  enabled?: boolean;
  /** 要监听的事件类型 */
  events?: ('mousedown' | 'touchstart')[];
  /** 点击外部时的回调函数 */
  onClickAway?: (event: Event) => void;
}

export interface UseClickAwayReturn<T extends HTMLElement = HTMLElement> {
  /** 要检测点击外部的元素引用 */
  ref: RefObject<T | null>;
}

/**
 * 点击外部检测 Hook
 * 用于检测用户是否点击了指定元素之外的区域
 * 
 * @param options 配置选项
 * @returns 返回元素引用
 * 
 * @example
 * ```tsx
 * const { ref } = useClickAway({
 *   onClickAway: () => console.log('点击了外部'),
 *   events: ['mousedown', 'touchstart']
 * });
 * 
 * return <div ref={ref}>点击外部会触发回调</div>;
 * ```
 */
export const useClickAway = <T extends HTMLElement = HTMLElement>(
  options: UseClickAwayOptions = {}
): UseClickAwayReturn<T> => {
  const {
    enabled = true,
    events = ['mousedown', 'touchstart'],
    onClickAway
  } = options;

  const ref = useRef<T>(null);
  const callbackRef = useRef(onClickAway);

  useLayoutEffect(() => {
    callbackRef.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    if (!enabled || !callbackRef.current) return;

    const handler = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current?.(event);
      }
    };

    events.forEach(eventType => {
      document.addEventListener(eventType, handler);
    });

    return () => {
      events.forEach(eventType => {
        document.removeEventListener(eventType, handler);
      });
    };
  }, [enabled, events]);

  return { ref };
}; 