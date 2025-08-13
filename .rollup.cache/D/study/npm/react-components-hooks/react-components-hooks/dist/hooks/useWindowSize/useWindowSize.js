import { useEffect, useState } from 'react';
export const useWindowSize = (options = {}) => {
    const { debounceMs = 100, initialSize = { width: 0, height: 0 } } = options;
    const [size, setSize] = useState(() => {
        if (typeof window !== 'undefined') {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        }
        return initialSize;
    });
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, debounceMs);
        };
        // 使用 ResizeObserver 监听文档根元素
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === document.documentElement) {
                    handleResize();
                    break;
                }
            }
        });
        // 同时监听 window resize 事件作为备用
        window.addEventListener('resize', handleResize);
        observer.observe(document.documentElement);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, [debounceMs]);
    return size;
};
//# sourceMappingURL=useWindowSize.js.map