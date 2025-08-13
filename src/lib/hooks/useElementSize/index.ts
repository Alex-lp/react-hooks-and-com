import { useEffect, useState, useRef, RefObject, useCallback } from 'react';

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
export const useElementSize = <T extends HTMLElement = HTMLElement>(
  options: UseElementSizeOptions = {}
): UseElementSizeReturn<T> => {
  const {
    enabled = false,
    includeBorder = false,
    includePadding = false,
    onSizeChange,
    debounceMs = 0
  } = options;

  const ref = useRef<T>(null);
  const [size, setSize] = useState<ElementSize>({
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
  const observerRef = useRef<ResizeObserver | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const optionsRef = useRef({ includeBorder, includePadding });

  // 更新选项引用
  useEffect(() => {
    optionsRef.current = { includeBorder, includePadding };
  }, [includeBorder, includePadding]);

  // 计算元素尺寸
  const calculateSize = useCallback((element: T): ElementSize => {
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
      width: optionsRef.current.includeBorder ? rect.width : contentWidth + paddingWidth,
      height: optionsRef.current.includeBorder ? rect.height : contentHeight + paddingHeight,
      contentWidth,
      contentHeight,
      borderWidth,
      borderHeight,
      paddingWidth,
      paddingHeight
    };
  }, []);

  // 更新尺寸
  const updateSize = useCallback(() => {
    const element = ref.current;
    if (!element) return;

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
    } else {
      updateSize();
    }
  }, [updateSize, debounceMs]);

  // 开始监听
  const startObserving = useCallback(() => {
    const element = ref.current;
    if (!element || isObserving) return;

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

  // 只在组件卸载时清理
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    ref,
    size,
    isObserving,
    startObserving,
    stopObserving,
    updateSize
  };
};
