export interface UseCounterOptions {
    initialValue?: number;
    min?: number;
    max?: number;
    step?: number;
}
export interface UseCounterReturn {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    setCount: (value: number) => void;
    isMin: boolean;
    isMax: boolean;
}
export declare const useCounter: (options?: UseCounterOptions) => UseCounterReturn;
//# sourceMappingURL=useCounter.d.ts.map