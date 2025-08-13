import { useEffect, useRef, useState, RefObject } from 'react';

export interface UseInViewOptions extends IntersectionObserverInit {
  /** 是否在初始渲染时触发回调 */
  triggerOnce?: boolean;
  /** 元素进入视口时的回调 */
  onEnter?: () => void;
  /** 元素离开视口时的回调 */
  onLeave?: () => void;
}

export interface UseInViewReturn {
  /** 要检测的元素引用 */
  ref: RefObject<Element | null>;
  /** 元素是否在视口中 */
  inView: boolean;
  /** 元素进入视口的次数 */
  entryCount: number;
  /** 元素是否已经进入过视口（仅在 triggerOnce 为 true 时有效） */
  hasEntered: boolean;
}

/**
 * 视口检测 Hook
 * 用于检测元素是否进入或离开视口
 * 
 * @param options 配置选项
 * @returns 返回元素引用和视口状态
 * 
 * @example
 * ```tsx
 * const { ref, inView, entryCount } = useInView({
 *   threshold: 0.5,
 *   rootMargin: '0px 0px -100px 0px',
 *   onEnter: () => console.log('元素进入视口'),
 *   onLeave: () => console.log('元素离开视口')
 * });
 * 
 * return <div ref={ref}>当前在视口中: {inView ? '是' : '否'}</div>;
 * ```
 */
export const useInView = (options: UseInViewOptions = {}): UseInViewReturn => {
  const {
    threshold = 0,
    rootMargin = '0px',
    root,
    triggerOnce = false,
    onEnter,
    onLeave
  } = options;

  const ref = useRef<Element>(null);
  const [inView, setInView] = useState(false);
  const [entryCount, setEntryCount] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setInView(true);
          setEntryCount(prev => prev + 1);
          
          if (!hasEntered) {
            setHasEntered(true);
            onEnter?.();
          }
        } else {
          setInView(false);
          if (!triggerOnce) {
            onLeave?.();
          }
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, triggerOnce, onEnter, onLeave, hasEntered]);

  return {
    ref,
    inView,
    entryCount,
    hasEntered
  };
}; 