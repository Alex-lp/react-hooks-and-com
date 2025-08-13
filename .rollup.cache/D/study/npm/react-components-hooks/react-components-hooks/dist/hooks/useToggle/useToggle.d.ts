export interface UseToggleOptions<T = boolean> {
    initialValue?: T;
    trueValue?: T;
    falseValue?: T;
}
export interface UseToggleReturn<T> {
    value: T;
    toggle: () => void;
    setValue: (value: T) => void;
    setTrue: () => void;
    setFalse: () => void;
}
export declare const useToggle: <T = boolean>(options?: UseToggleOptions<T>) => UseToggleReturn<T>;
//# sourceMappingURL=useToggle.d.ts.map