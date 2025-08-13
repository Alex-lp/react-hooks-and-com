import { useCallback, useEffect, useRef, useState, RefObject } from 'react';

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
export const useFullscreen = <T extends HTMLElement = HTMLDivElement>(
  options: UseFullscreenOptions = {}
): UseFullscreenReturn<T> => {
  const {
    onEnter,
    onExit,
    background,
    enabled = true
  } = options;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const elementRef = useRef<T>(null);
  const originalStylesRef = useRef<{
    background?: string;
    overflow?: string;
  }>({});

  // 检查浏览器是否支持全屏
  const isSupported = typeof window !== 'undefined' && !!(
    document.fullscreenEnabled ||
    (document as any).webkitFullscreenEnabled ||
    (document as any).mozFullScreenEnabled ||
    (document as any).msFullscreenEnabled
  );

  const handleFullscreenChange = useCallback(() => {
    const isFull = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );
    
    setIsFullscreen(isFull);
    
    // 当退出全屏时，恢复原始样式
    if (!isFull) {
      // 恢复元素背景
      if (elementRef.current) {
        const element = elementRef.current;
        if (originalStylesRef.current.background !== undefined) {
          element.style.background = originalStylesRef.current.background;
        } else {
          element.style.removeProperty('background');
        }
      }
      
      // 恢复 body 的 overflow 样式
      if (originalStylesRef.current.overflow !== undefined) {
        document.body.style.overflow = originalStylesRef.current.overflow;
      } else {
        document.body.style.removeProperty('overflow');
      }
    }
  }, []);

  // 进入全屏
  const enterFullscreen = useCallback(async (): Promise<void> => {
    if (!enabled || !isSupported || !elementRef.current) {
      throw new Error('Fullscreen not supported or element not available');
    }

    try {
      setError(null);
      const element = elementRef.current;

      // 保存原始样式
      originalStylesRef.current = {
        background: element.style.background || '',
        overflow: document.body.style.overflow || ''
      };

      // 设置全屏背景颜色
      if (background) {
        element.style.background = background;
      }
      
      // 隐藏滚动条
      document.body.style.overflow = 'hidden';

      // 请求全屏
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      } else {
        throw new Error('Fullscreen API not supported');
      }

      onEnter?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    }
  }, [enabled, isSupported, background, onEnter]);

  // 退出全屏
  const exitFullscreen = useCallback(async (): Promise<void> => {
    if (!enabled || !isSupported) {
      throw new Error('Fullscreen not supported');
    }

    try {
      setError(null);

      // 退出全屏
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      } else {
        throw new Error('Exit fullscreen API not supported');
      }

      onExit?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    }
  }, [enabled, isSupported, onExit]);

  // 切换全屏状态
  const toggleFullscreen = useCallback(async (): Promise<void> => {
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      await enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // 监听全屏状态变化
  useEffect(() => {
    if (!enabled || !isSupported) return;

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [enabled, isSupported, handleFullscreenChange]);

  return {
    elementRef,
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isSupported,
    error
  };
};
