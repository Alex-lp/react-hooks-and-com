export interface Serializer<T> {
    stringify: (value: T) => string;
    parse: (value: string) => T;
}
export interface UseLocalStorageOptions<T = unknown> {
    serializer?: Serializer<T>;
    onError?: (error: Error) => void;
}
export interface UseLocalStorageReturn<T> {
    value: T;
    setValue: (value: T | ((prev: T) => T)) => void;
    removeValue: () => void;
    isStored: boolean;
}
export declare const useLocalStorage: <T>(key: string, initialValue: T, options?: UseLocalStorageOptions<T>) => UseLocalStorageReturn<T>;
//# sourceMappingURL=useLocalStorage.d.ts.map