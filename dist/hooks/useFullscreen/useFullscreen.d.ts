import { RefObject } from 'react';
export interface UseFullscreenOptions {
    /** 进入全屏时的回调 */
    onEnter?: () => void;
    /** 退出全屏时的回调 */
    onExit?: () => void;
    /** 全屏时背景颜色 */
    background?: string;
    /** 是否启用全屏功能 */
    enabled?: boolean;
}
export interface UseFullscreenReturn<T extends HTMLElement = HTMLDivElement> {
    /** 要全屏显示的元素引用 */
    elementRef: RefObject<T | null>;
    /** 是否处于全屏状态 */
    isFullscreen: boolean;
    /** 进入全屏 */
    enterFullscreen: () => Promise<void>;
    /** 退出全屏 */
    exitFullscreen: () => Promise<void>;
    /** 切换全屏状态 */
    toggleFullscreen: () => Promise<void>;
    /** 是否支持全屏 */
    isSupported: boolean;
    /** 错误信息 */
    error: Error | null;
}
/**
 * 全屏功能 Hook
 * 提供进入、退出和切换全屏的功能
 *
 * @template T - 元素类型
 * @param options 配置选项
 * @returns 返回全屏操作相关的方法和状态
 *
 * @example
 * ```tsx
 * const { elementRef, isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen } = useFullscreen({
 *   onEnter: () => console.log('进入全屏'),
 *   onExit: () => console.log('退出全屏'),
 *   background: '#000'
 * });
 *
 * return (
 *   <div ref={elementRef} className="w-64 h-48 bg-blue-500">
 *     <button onClick={enterFullscreen}>进入全屏</button>
 *     <button onClick={exitFullscreen}>退出全屏</button>
 *     <button onClick={toggleFullscreen}>切换全屏</button>
 *     <p>全屏状态: {isFullscreen ? '是' : '否'}</p>
 *   </div>
 * );
 * ```
 */
export declare const useFullscreen: <T extends HTMLElement = HTMLDivElement>(options?: UseFullscreenOptions) => UseFullscreenReturn<T>;
//# sourceMappingURL=useFullscreen.d.ts.map