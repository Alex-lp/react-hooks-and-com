import { RefObject } from 'react';
export interface ElementSize {
    /** 元素宽度 */
    width: number;
    /** 元素高度 */
    height: number;
    /** 元素内容宽度 */
    contentWidth: number;
    /** 元素内容高度 */
    contentHeight: number;
    /** 元素边框宽度 */
    borderWidth: number;
    /** 元素边框高度 */
    borderHeight: number;
    /** 元素内边距宽度 */
    paddingWidth: number;
    /** 元素内边距高度 */
    paddingHeight: number;
}
export interface UseElementSizeOptions {
    /** 是否启用尺寸监听 */
    enabled?: boolean;
    /** 是否包含边框 */
    includeBorder?: boolean;
    /** 是否包含内边距 */
    includePadding?: boolean;
    /** 尺寸变化时的回调 */
    onSizeChange?: (size: ElementSize) => void;
    /** 防抖延迟（毫秒） */
    debounceMs?: number;
}
export interface UseElementSizeReturn<T extends HTMLElement = HTMLElement> {
    /** 要监听的元素引用 */
    ref: RefObject<T | null>;
    /** 元素尺寸信息 */
    size: ElementSize;
    /** 是否正在监听 */
    isObserving: boolean;
    /** 开始监听 */
    startObserving: () => void;
    /** 停止监听 */
    stopObserving: () => void;
    /** 手动更新尺寸 */
    updateSize: () => void;
}
/**
 * 元素尺寸监听 Hook
 * 用于获取和监听元素的尺寸变化
 *
 * @template T - 元素类型
 * @param options 配置选项
 * @returns 返回元素引用和尺寸信息
 *
 * @example
 * ```tsx
 * const { ref, size, isObserving, startObserving, stopObserving } = useElementSize({
 *   includeBorder: true,
 *   includePadding: true,
 *   onSizeChange: (size) => console.log('尺寸变化:', size),
 *   debounceMs: 100
 * });
 *
 * return (
 *   <div ref={ref} className="w-64 h-48 border p-4">
 *     <p>宽度: {size.width}px</p>
 *     <p>高度: {size.height}px</p>
 *     <button onClick={startObserving}>开始监听</button>
 *     <button onClick={stopObserving}>停止监听</button>
 *   </div>
 * );
 * ```
 */
export declare const useElementSize: <T extends HTMLElement = HTMLElement>(options?: UseElementSizeOptions) => UseElementSizeReturn<T>;
//# sourceMappingURL=useElementSize.d.ts.map