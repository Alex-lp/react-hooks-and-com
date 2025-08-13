export interface WindowSize {
    width: number;
    height: number;
}
export interface UseWindowSizeOptions {
    debounceMs?: number;
    initialSize?: WindowSize;
}
export declare const useWindowSize: (options?: UseWindowSizeOptions) => WindowSize;
//# sourceMappingURL=useWindowSize.d.ts.map