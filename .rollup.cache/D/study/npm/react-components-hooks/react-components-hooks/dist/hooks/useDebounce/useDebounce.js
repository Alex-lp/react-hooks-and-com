import { useEffect, useState } from 'react';
export const useDebounce = (initialValue, options = {}) => {
    const { delay = 500, immediate = false } = options;
    const [value, setValue] = useState(initialValue);
    const [debouncedValue, setDebouncedValue] = useState(initialValue);
    const [isPending, setIsPending] = useState(false);
    useEffect(() => {
        if (immediate) {
            setDebouncedValue(value);
            setIsPending(false);
            return;
        }
        setIsPending(true);
        const timer = setTimeout(() => {
            setDebouncedValue(value);
            setIsPending(false);
        }, delay);
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay, immediate]);
    return {
        value,
        setValue,
        debouncedValue,
        isPending,
    };
};
//# sourceMappingURL=useDebounce.js.map