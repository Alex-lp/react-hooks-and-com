import { useCallback, useEffect, useRef, useState } from 'react';
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
export const useFullscreen = (options = {}) => {
    const { onEnter, onExit, background, enabled = true } = options;
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [error, setError] = useState(null);
    const elementRef = useRef(null);
    const originalStylesRef = useRef({});
    // 检查浏览器是否支持全屏
    const isSupported = typeof window !== 'undefined' && !!(document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled);
    const handleFullscreenChange = useCallback(() => {
        const isFull = !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement);
        setIsFullscreen(isFull);
    }, []);
    // 进入全屏
    const enterFullscreen = useCallback(async () => {
        if (!enabled || !isSupported || !elementRef.current) {
            throw new Error('Fullscreen not supported or element not available');
        }
        try {
            setError(null);
            const element = elementRef.current;
            // 保存原始样式
            originalStylesRef.current = {
                background: element.style.background,
                overflow: document.body.style.overflow
            };
            // 设置全屏背景颜色
            if (background) {
                element.style.background = background;
            }
            document.body.style.overflow = 'hidden';
            // 请求全屏
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            }
            else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen();
            }
            else if (element.mozRequestFullScreen) {
                await element.mozRequestFullScreen();
            }
            else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen();
            }
            else {
                throw new Error('Fullscreen API not supported');
            }
            onEnter?.();
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setError(error);
            throw error;
        }
    }, [enabled, isSupported, background, onEnter]);
    // 退出全屏
    const exitFullscreen = useCallback(async () => {
        if (!enabled || !isSupported) {
            throw new Error('Fullscreen not supported');
        }
        try {
            setError(null);
            // 恢复原始样式
            if (elementRef.current) {
                const element = elementRef.current;
                element.style.background = originalStylesRef.current.background || '';
            }
            document.body.style.overflow = originalStylesRef.current.overflow || '';
            // 退出全屏
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
            else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }
            else {
                throw new Error('Exit fullscreen API not supported');
            }
            onExit?.();
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setError(error);
            throw error;
        }
    }, [enabled, isSupported, onExit]);
    // 切换全屏状态
    const toggleFullscreen = useCallback(async () => {
        if (isFullscreen) {
            await exitFullscreen();
        }
        else {
            await enterFullscreen();
        }
    }, [isFullscreen, enterFullscreen, exitFullscreen]);
    // 监听全屏状态变化
    useEffect(() => {
        if (!enabled || !isSupported)
            return;
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
//# sourceMappingURL=useFullscreen.js.map