export interface UseThrottleOptions {
    leading?: boolean;
    trailing?: boolean;
}
export interface UseThrottleReturn<T> {
    value: T;
    setValue: (value: T) => void;
    throttledValue: T;
    isThrottled: boolean;
}
export declare const useThrottle: <T>(initialValue: T, interval?: number, options?: UseThrottleOptions) => UseThrottleReturn<T>;
//# sourceMappingURL=useThrottle.d.ts.map