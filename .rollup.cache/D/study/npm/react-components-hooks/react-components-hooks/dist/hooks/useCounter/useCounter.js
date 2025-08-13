import { useState, useCallback } from 'react';
export const useCounter = (options = {}) => {
    const { initialValue = 0, min = -Infinity, max = Infinity, step = 1, } = options;
    const [count, setCountState] = useState(initialValue);
    const setCount = useCallback((value) => {
        const clampedValue = Math.min(Math.max(value, min), max);
        setCountState(clampedValue);
    }, [min, max]);
    const increment = useCallback(() => {
        setCount(count + step);
    }, [count, step, setCount]);
    const decrement = useCallback(() => {
        setCount(count - step);
    }, [count, step, setCount]);
    const reset = useCallback(() => {
        setCountState(initialValue);
    }, [initialValue]);
    const isMin = count <= min;
    const isMax = count >= max;
    return {
        count,
        increment,
        decrement,
        reset,
        setCount,
        isMin,
        isMax,
    };
};
//# sourceMappingURL=useCounter.js.map