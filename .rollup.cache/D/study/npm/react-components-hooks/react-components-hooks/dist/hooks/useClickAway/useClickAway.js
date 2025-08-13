import { useEffect, useLayoutEffect, useRef } from 'react';
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
export const useClickAway = (options = {}) => {
    const { enabled = true, events = ['mousedown', 'touchstart'], onClickAway } = options;
    const ref = useRef(null);
    const callbackRef = useRef(onClickAway);
    useLayoutEffect(() => {
        callbackRef.current = onClickAway;
    }, [onClickAway]);
    useEffect(() => {
        if (!enabled || !callbackRef.current)
            return;
        const handler = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
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
//# sourceMappingURL=useClickAway.js.map