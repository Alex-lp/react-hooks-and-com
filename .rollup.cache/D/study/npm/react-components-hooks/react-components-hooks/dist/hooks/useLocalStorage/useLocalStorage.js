import { useCallback, useState } from 'react';
export const useLocalStorage = (key, initialValue, options = {}) => {
    const { serializer = {
        stringify: JSON.stringify,
        parse: JSON.parse
    }, onError = (error) => console.error('useLocalStorage error:', error) } = options;
    const [storedValue, setStoredValue] = useState(() => {
        try {
            if (typeof window === 'undefined') {
                return initialValue;
            }
            const item = window.localStorage.getItem(key);
            return item ? serializer.parse(item) : initialValue;
        }
        catch (error) {
            onError(error);
            return initialValue;
        }
    });
    const [isStored, setIsStored] = useState(() => {
        try {
            if (typeof window === 'undefined') {
                return false;
            }
            return window.localStorage.getItem(key) !== null;
        }
        catch {
            return false;
        }
    });
    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            setIsStored(true);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, serializer.stringify(valueToStore));
            }
        }
        catch (error) {
            onError(error);
        }
    }, [key, storedValue, serializer, onError]);
    const removeValue = useCallback(() => {
        try {
            setStoredValue(initialValue);
            setIsStored(false);
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
        }
        catch (error) {
            onError(error);
        }
    }, [key, initialValue, onError]);
    return {
        value: storedValue,
        setValue,
        removeValue,
        isStored,
    };
};
//# sourceMappingURL=useLocalStorage.js.map