import { RefObject } from 'react';
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
export declare const useClickAway: <T extends HTMLElement = HTMLElement>(options?: UseClickAwayOptions) => UseClickAwayReturn<T>;
//# sourceMappingURL=useClickAway.d.ts.map