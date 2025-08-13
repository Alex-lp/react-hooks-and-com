import { useEffect, useState, useCallback } from 'react';
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
export const useMouse = (options = {}) => {
    const { enabled = true, target = typeof window !== 'undefined' ? window : null, onMouseMove, onMouseEnter, onMouseLeave } = options;
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        pageX: 0,
        pageY: 0,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0
    });
    const [isInside, setIsInside] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const updateMousePosition = useCallback((event) => {
        const mouseEvent = event;
        const newPosition = {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY,
            pageX: mouseEvent.pageX,
            pageY: mouseEvent.pageY,
            screenX: mouseEvent.screenX,
            screenY: mouseEvent.screenY,
            clientX: mouseEvent.clientX,
            clientY: mouseEvent.clientY
        };
        setPosition(newPosition);
        setIsMoving(true);
        onMouseMove?.(newPosition);
        // 重置移动状态
        setTimeout(() => setIsMoving(false), 100);
    }, [onMouseMove]);
    const handleMouseEnter = useCallback((event) => {
        const mouseEvent = event;
        setIsInside(true);
        const newPosition = {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY,
            pageX: mouseEvent.pageX,
            pageY: mouseEvent.pageY,
            screenX: mouseEvent.screenX,
            screenY: mouseEvent.screenY,
            clientX: mouseEvent.clientX,
            clientY: mouseEvent.clientY
        };
        onMouseEnter?.(newPosition);
    }, [onMouseEnter]);
    const handleMouseLeave = useCallback((event) => {
        const mouseEvent = event;
        setIsInside(false);
        const newPosition = {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY,
            pageX: mouseEvent.pageX,
            pageY: mouseEvent.pageY,
            screenX: mouseEvent.screenX,
            screenY: mouseEvent.screenY,
            clientX: mouseEvent.clientX,
            clientY: mouseEvent.clientY
        };
        onMouseLeave?.(newPosition);
    }, [onMouseLeave]);
    const reset = useCallback(() => {
        setPosition({
            x: 0,
            y: 0,
            pageX: 0,
            pageY: 0,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0
        });
        setIsInside(false);
        setIsMoving(false);
    }, []);
    useEffect(() => {
        if (!enabled || !target)
            return;
        target.addEventListener('mousemove', updateMousePosition);
        target.addEventListener('mouseenter', handleMouseEnter);
        target.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            target.removeEventListener('mousemove', updateMousePosition);
            target.removeEventListener('mouseenter', handleMouseEnter);
            target.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [enabled, target, updateMousePosition, handleMouseEnter, handleMouseLeave]);
    return {
        position,
        isInside,
        isMoving,
        reset
    };
};
//# sourceMappingURL=useMouse.js.map