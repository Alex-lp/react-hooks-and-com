import { useCallback, useState } from 'react';
export const useToggle = (options = {}) => {
    const { initialValue = false, trueValue = true, falseValue = false, } = options;
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(() => {
        setValue(prev => prev === trueValue ? falseValue : trueValue);
    }, [trueValue, falseValue]);
    const setTrue = useCallback(() => {
        setValue(trueValue);
    }, [trueValue]);
    const setFalse = useCallback(() => {
        setValue(falseValue);
    }, [falseValue]);
    return {
        value,
        toggle,
        setValue,
        setTrue,
        setFalse,
    };
};
//# sourceMappingURL=useToggle.js.map