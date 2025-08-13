import { useEffect, useRef, useState } from 'react';
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
export const useInView = (options = {}) => {
    const { threshold = 0, rootMargin = '0px', root, triggerOnce = false, onEnter, onLeave } = options;
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    const [entryCount, setEntryCount] = useState(0);
    const [hasEntered, setHasEntered] = useState(false);
    useEffect(() => {
        const element = ref.current;
        if (!element)
            return;
        const observer = new IntersectionObserver(([entry]) => {
            const isIntersecting = entry.isIntersecting;
            if (isIntersecting) {
                setInView(true);
                setEntryCount(prev => prev + 1);
                if (!hasEntered) {
                    setHasEntered(true);
                    onEnter?.();
                }
            }
            else {
                setInView(false);
                if (!triggerOnce) {
                    onLeave?.();
                }
            }
        }, {
            threshold,
            rootMargin,
            root
        });
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
//# sourceMappingURL=useInView.js.map