import { useEffect, useState, useRef, useCallback } from 'react';
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
export const useElementSize = (options = {}) => {
    const { enabled = true, includeBorder = false, includePadding = false, onSizeChange, debounceMs = 0 } = options;
    const ref = useRef(null);
    const [size, setSize] = useState({
        width: 0,
        height: 0,
        contentWidth: 0,
        contentHeight: 0,
        borderWidth: 0,
        borderHeight: 0,
        paddingWidth: 0,
        paddingHeight: 0
    });
    const [isObserving, setIsObserving] = useState(false);
    const observerRef = useRef(null);
    const debounceTimerRef = useRef(null);
    // 计算元素尺寸
    const calculateSize = useCallback((element) => {
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        const borderLeft = parseFloat(computedStyle.borderLeftWidth) || 0;
        const borderRight = parseFloat(computedStyle.borderRightWidth) || 0;
        const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
        const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
        const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
        const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
        const borderWidth = borderLeft + borderRight;
        const borderHeight = borderTop + borderBottom;
        const paddingWidth = paddingLeft + paddingRight;
        const paddingHeight = paddingTop + paddingBottom;
        const contentWidth = rect.width - borderWidth - paddingWidth;
        const contentHeight = rect.height - borderHeight - paddingHeight;
        return {
            width: includeBorder ? rect.width : contentWidth + paddingWidth,
            height: includeBorder ? rect.height : contentHeight + paddingHeight,
            contentWidth,
            contentHeight,
            borderWidth,
            borderHeight,
            paddingWidth,
            paddingHeight
        };
    }, [includeBorder, includePadding]);
    // 更新尺寸
    const updateSize = useCallback(() => {
        const element = ref.current;
        if (!element)
            return;
        const newSize = calculateSize(element);
        setSize(newSize);
        onSizeChange?.(newSize);
    }, [calculateSize, onSizeChange]);
    // 防抖更新
    const debouncedUpdateSize = useCallback(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        if (debounceMs > 0) {
            debounceTimerRef.current = setTimeout(updateSize, debounceMs);
        }
        else {
            updateSize();
        }
    }, [updateSize, debounceMs]);
    // 开始监听
    const startObserving = useCallback(() => {
        const element = ref.current;
        if (!element || isObserving)
            return;
        // 立即计算一次尺寸
        updateSize();
        // 创建 ResizeObserver
        if (typeof ResizeObserver !== 'undefined') {
            observerRef.current = new ResizeObserver(() => {
                debouncedUpdateSize();
            });
            observerRef.current.observe(element);
            setIsObserving(true);
        }
    }, [isObserving, updateSize, debouncedUpdateSize]);
    // 停止监听
    const stopObserving = useCallback(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        setIsObserving(false);
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = null;
        }
    }, []);
    // 初始化
    useEffect(() => {
        if (enabled) {
            startObserving();
        }
        else {
            stopObserving();
        }
        return () => {
            stopObserving();
        };
    }, [enabled, startObserving, stopObserving]);
    // 清理
    useEffect(() => {
        return () => {
            stopObserving();
        };
    }, [stopObserving]);
    return {
        ref,
        size,
        isObserving,
        startObserving,
        stopObserving,
        updateSize
    };
};
//# sourceMappingURL=useElementSize.js.map