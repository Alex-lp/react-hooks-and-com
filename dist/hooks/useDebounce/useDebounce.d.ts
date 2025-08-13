export interface UseDebounceOptions {
    delay?: number;
    immediate?: boolean;
}
export interface UseDebounceReturn<T> {
    value: T;
    setValue: (value: T) => void;
    debouncedValue: T;
    isPending: boolean;
}
export declare const useDebounce: <T>(initialValue: T, options?: UseDebounceOptions) => UseDebounceReturn<T>;
//# sourceMappingURL=useDebounce.d.ts.map