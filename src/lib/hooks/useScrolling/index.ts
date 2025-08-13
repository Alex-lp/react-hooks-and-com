import { useState, useRef, useCallback, RefObject, useEffect } from 'react';

export interface UseScrollingOptions {
  /** 滚动开始时的回调 */
  onScrollStart?: () => void;
  /** 滚动结束时的回调 */
  onScrollEnd?: () => void;
  /** 滚动时的回调 */
  onScroll?: (event: Event) => void;
  /** 是否启用滚动监听 */
  enabled?: boolean;
  /** 滚动结束的延迟时间（毫秒） */
  scrollEndDelay?: number;
  /** 是否监听水平滚动 */
  horizontal?: boolean;
  /** 是否监听垂直滚动 */
  vertical?: boolean;
}

export interface UseScrollingReturn<T extends HTMLElement = HTMLElement> {
  /** 要监听的元素引用 */
  ref: RefObject<T | null>;
  /** 是否正在滚动 */
  isScrolling: boolean;
  /** 滚动方向 */
  scrollDirection: 'horizontal' | 'vertical' | 'both' | null;
  /** 滚动位置信息 */
  scrollPosition: {
    scrollTop: number;
    scrollLeft: number;
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
  };
  /** 手动设置滚动状态 */
  setScrolling: (scrolling: boolean) => void;
}

/**
 * 滚动监听 Hook
 * 用于监听 DOM 元素的滚动状态
 * 
 * @template T - 元素类型
 * @param options 配置选项
 * @returns 返回元素引用和滚动状态
 * 
 * @example
 * ```tsx
 * const { ref, isScrolling, scrollDirection, scrollPosition } = useScrolling({
 *   onScrollStart: () => console.log('开始滚动'),
 *   onScrollEnd: () => console.log('结束滚动'),
 *   scrollEndDelay: 150,
 *   horizontal: true,
 *   vertical: true
 * });
 * 
 * return (
 *   <div 
 *     ref={ref} 
 *     className={`p-4 border rounded ${isScrolling ? 'bg-blue-100' : 'bg-white'}`}
 *     style={{ height: '200px', overflow: 'auto' }}
 *   >
 *     {isScrolling ? '正在滚动' : '未滚动'}
 *   </div>
 * );
 * ```
 */
export const useScrolling = <T extends HTMLElement = HTMLElement>(
  options: UseScrollingOptions = {}
): UseScrollingReturn<T> => {
  const {
    onScrollStart,
    onScrollEnd,
    onScroll,
    enabled = true,
    scrollEndDelay = 150,
    horizontal = true,
    vertical = true
  } = options;

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'horizontal' | 'vertical' | 'both' | null>(null);
  const [scrollPosition, setScrollPosition] = useState({
    scrollTop: 0,
    scrollLeft: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    clientWidth: 0,
    clientHeight: 0
  });

  const ref = useRef<T>(null);
  const scrollEndTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTopRef = useRef(0);
  const lastScrollLeftRef = useRef(0);
  const isScrollingRef = useRef(false);
  
  // 使用 ref 存储最新的回调函数，避免依赖循环
  const callbacksRef = useRef({
    onScrollStart,
    onScrollEnd,
    onScroll,
    enabled,
    scrollEndDelay,
    horizontal,
    vertical
  });

  // 更新回调函数引用
  useEffect(() => {
    callbacksRef.current = {
      onScrollStart,
      onScrollEnd,
      onScroll,
      enabled,
      scrollEndDelay,
      horizontal,
      vertical
    };
  });

  // 清除滚动结束定时器
  const clearScrollEndTimer = useCallback(() => {
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = null;
    }
  }, []);



  // 处理滚动事件
  const handleScroll = useCallback((event: Event) => {
    const { enabled, onScrollStart, onScrollEnd, onScroll, scrollEndDelay, horizontal, vertical } = callbacksRef.current;
    
    if (!enabled) return;

    const element = event.target as T;
    if (!element) return;

    // 更新滚动位置
    const newScrollPosition = {
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight
    };
    setScrollPosition(newScrollPosition);

    // 确定滚动方向
    const currentScrollTop = element.scrollTop;
    const currentScrollLeft = element.scrollLeft;
    const topChanged = currentScrollTop !== lastScrollTopRef.current;
    const leftChanged = currentScrollLeft !== lastScrollLeftRef.current;

    let direction: 'horizontal' | 'vertical' | 'both' | null = null;
    if (topChanged && leftChanged) {
      direction = 'both';
    } else if (topChanged && vertical) {
      direction = 'vertical';
    } else if (leftChanged && horizontal) {
      direction = 'horizontal';
    }

    if (direction) {
      setScrollDirection(direction);
    }

    // 更新最后的滚动位置
    lastScrollTopRef.current = element.scrollTop;
    lastScrollLeftRef.current = element.scrollLeft;

    // 如果还没有开始滚动，触发开始回调
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      setIsScrolling(true);
      onScrollStart?.();
    }

    // 清除之前的定时器
    clearScrollEndTimer();

    // 设置滚动结束定时器
    scrollEndTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      setIsScrolling(false);
      setScrollDirection(null);
      onScrollEnd?.();
    }, scrollEndDelay);

    // 触发滚动回调
    onScroll?.(event);
  }, [clearScrollEndTimer]);

  // 处理鼠标离开事件
  const handleMouseLeave = useCallback(() => {
    const { enabled, onScrollEnd } = callbacksRef.current;
    
    if (!enabled) return;

    // 立即停止滚动状态
    clearScrollEndTimer();
    isScrollingRef.current = false;
    setIsScrolling(false);
    setScrollDirection(null);
    onScrollEnd?.();
  }, [clearScrollEndTimer]);

  // 手动设置滚动状态
  const setScrolling = useCallback((scrolling: boolean) => {
    const { onScrollStart, onScrollEnd } = callbacksRef.current;
    
    clearScrollEndTimer();
    isScrollingRef.current = scrolling;
    setIsScrolling(scrolling);
    if (!scrolling) {
      setScrollDirection(null);
      onScrollEnd?.();
    } else {
      onScrollStart?.();
    }
  }, [clearScrollEndTimer]);



  // 设置事件监听器
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 初始化滚动位置
    const position = {
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight
    };
    setScrollPosition(position);
    lastScrollTopRef.current = position.scrollTop;
    lastScrollLeftRef.current = position.scrollLeft;

    // 添加事件监听器
    element.addEventListener('scroll', handleScroll, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('scroll', handleScroll);
      element.removeEventListener('mouseleave', handleMouseLeave);
      clearScrollEndTimer();
    };
  }, []); // 空依赖数组，只在挂载时执行一次

  return {
    ref,
    isScrolling,
    scrollDirection,
    scrollPosition,
    setScrolling
  };
};
