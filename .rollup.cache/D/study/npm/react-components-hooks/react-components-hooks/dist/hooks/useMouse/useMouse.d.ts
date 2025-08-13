export interface MousePosition {
    /** 鼠标 X 坐标 */
    x: number;
    /** 鼠标 Y 坐标 */
    y: number;
    /** 鼠标相对于页面的 X 坐标 */
    pageX: number;
    /** 鼠标相对于页面的 Y 坐标 */
    pageY: number;
    /** 鼠标相对于屏幕的 X 坐标 */
    screenX: number;
    /** 鼠标相对于屏幕的 Y 坐标 */
    screenY: number;
    /** 鼠标相对于元素的 X 坐标 */
    clientX: number;
    /** 鼠标相对于元素的 Y 坐标 */
    clientY: number;
}
export interface UseMouseOptions {
    /** 是否启用鼠标监听 */
    enabled?: boolean;
    /** 要监听的元素（默认为 window） */
    target?: Element | null;
    /** 鼠标移动时的回调 */
    onMouseMove?: (position: MousePosition) => void;
    /** 鼠标进入时的回调 */
    onMouseEnter?: (position: MousePosition) => void;
    /** 鼠标离开时的回调 */
    onMouseLeave?: (position: MousePosition) => void;
}
export interface UseMouseReturn {
    /** 当前鼠标位置 */
    position: MousePosition;
    /** 鼠标是否在目标元素内 */
    isInside: boolean;
    /** 鼠标是否正在移动 */
    isMoving: boolean;
    /** 重置鼠标位置 */
    reset: () => void;
}
/**
 * 鼠标监听 Hook
 * 用于获取和监听鼠标的位置信息
 *
 * @param options 配置选项
 * @returns 返回鼠标位置和状态
 *
 * @example
 * ```tsx
 * const { position, isInside, isMoving } = useMouse({
 *   target: document.body,
 *   onMouseMove: (pos) => console.log('鼠标位置:', pos),
 *   onMouseEnter: () => console.log('鼠标进入'),
 *   onMouseLeave: () => console.log('鼠标离开')
 * });
 *
 * return (
 *   <div>
 *     <p>鼠标位置: ({position.x}, {position.y})</p>
 *     <p>是否在元素内: {isInside ? '是' : '否'}</p>
 *     <p>是否在移动: {isMoving ? '是' : '否'}</p>
 *   </div>
 * );
 * ```
 */
export declare const useMouse: (options?: UseMouseOptions) => UseMouseReturn;
//# sourceMappingURL=useMouse.d.ts.map