import { useState, useRef, useCallback, RefObject, useEffect } from 'react';

export interface UseHoverOptions {
  /** 鼠标进入时的回调 */
  onEnter?: () => void;
  /** 鼠标离开时的回调 */
  onLeave?: () => void;
  /** 是否启用悬浮监听 */
  enabled?: boolean;
  /** 延迟进入时间（毫秒） */
  delayEnter?: number;
  /** 延迟离开时间（毫秒） */
  delayLeave?: number;
}

export interface UseHoverReturn<T extends HTMLElement = HTMLElement> {
  /** 要监听的元素引用 */
  ref: RefObject<T | null>;
  /** 是否正在悬浮 */
  isHovered: boolean;
  /** 手动设置悬浮状态 */
  setHovered: (hovered: boolean) => void;
}

/**
 * 鼠标悬浮监听 Hook
 * 用于监听 DOM 元素的鼠标悬浮状态
 * 
 * @template T - 元素类型
 * @param options 配置选项
 * @returns 返回元素引用和悬浮状态
 * 
 * @example
 * ```tsx
 * const { ref, isHovered, setHovered } = useHover({
 *   onEnter: () => console.log('鼠标进入'),
 *   onLeave: () => console.log('鼠标离开'),
 *   delayEnter: 100,
 *   delayLeave: 200
 * });
 * 
 * return (
 *   <div 
 *     ref={ref} 
 *     className={`p-4 border rounded ${isHovered ? 'bg-blue-100' : 'bg-white'}`}
 *   >
 *     {isHovered ? '鼠标悬浮中' : '鼠标未悬浮'}
 *   </div>
 * );
 * ```
 */
export const useHover = <T extends HTMLElement = HTMLElement>(
  options: UseHoverOptions = {}
): UseHoverReturn<T> => {
  const {
    onEnter,
    onLeave,
    enabled = true,
    delayEnter = 0,
    delayLeave = 0
  } = options;

  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);
  const enterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 清除定时器
  const clearTimers = useCallback(() => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  // 处理鼠标进入
  const handleMouseEnter = useCallback(() => {
    if (!enabled) return;

    clearTimers();

    if (delayEnter > 0) {
      enterTimerRef.current = setTimeout(() => {
        setIsHovered(true);
        onEnter?.();
      }, delayEnter);
    } else {
      setIsHovered(true);
      onEnter?.();
    }
  }, [enabled, delayEnter, onEnter, clearTimers]);

  // 处理鼠标离开
  const handleMouseLeave = useCallback(() => {
    if (!enabled) return;

    clearTimers();

    if (delayLeave > 0) {
      leaveTimerRef.current = setTimeout(() => {
        setIsHovered(false);
        onLeave?.();
      }, delayLeave);
    } else {
      setIsHovered(false);
      onLeave?.();
    }
  }, [enabled, delayLeave, onLeave, clearTimers]);

  // 手动设置悬浮状态
  const setHovered = useCallback((hovered: boolean) => {
    clearTimers();
    setIsHovered(hovered);
    if (hovered) {
      onEnter?.();
    } else {
      onLeave?.();
    }
  }, [onEnter, onLeave, clearTimers]);

  // 当 enabled 状态改变时重新设置事件监听器
  useEffect(() => {
    const element = ref.current;
    if (element) {
      if (enabled) {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      } else {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    }

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimers();
    };
  }, [enabled, handleMouseEnter, handleMouseLeave, clearTimers]);

  return {
    ref,
    isHovered,
    setHovered
  };
};
