'use strict';

var React = require('react');

const useCounter = (options = {}) => {
  const {
    initialValue = 0,
    min = -Infinity,
    max = Infinity,
    step = 1
  } = options;
  const [count, setCountState] = React.useState(initialValue);
  const setCount = React.useCallback((value) => {
    const clampedValue = Math.min(Math.max(value, min), max);
    setCountState(clampedValue);
  }, [min, max]);
  const increment = React.useCallback(() => {
    setCount(count + step);
  }, [count, step, setCount]);
  const decrement = React.useCallback(() => {
    setCount(count - step);
  }, [count, step, setCount]);
  const reset = React.useCallback(() => {
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
    isMax
  };
};

const usePrevious = (value) => {
  const ref = React.useRef(void 0);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useToggle = (options = {}) => {
  const {
    initialValue = false,
    trueValue = true,
    falseValue = false
  } = options;
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue((prev) => prev === trueValue ? falseValue : trueValue);
  }, [trueValue, falseValue]);
  const setTrue = React.useCallback(() => {
    setValue(trueValue);
  }, [trueValue]);
  const setFalse = React.useCallback(() => {
    setValue(falseValue);
  }, [falseValue]);
  return {
    value,
    toggle,
    setValue,
    setTrue,
    setFalse
  };
};

const useWindowSize = (options = {}) => {
  const { debounceMs = 100, initialSize = { width: 0, height: 0 } } = options;
  const [size, setSize] = React.useState(() => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    return initialSize;
  });
  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, debounceMs);
    };
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === document.documentElement) {
          handleResize();
          break;
        }
      }
    });
    window.addEventListener("resize", handleResize);
    observer.observe(document.documentElement);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [debounceMs]);
  return size;
};

const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    serializer = {
      stringify: JSON.stringify,
      parse: JSON.parse
    },
    onError = (error) => console.error("useLocalStorage error:", error)
  } = options;
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? serializer.parse(item) : initialValue;
    } catch (error) {
      onError(error);
      return initialValue;
    }
  });
  const [isStored, setIsStored] = React.useState(() => {
    try {
      if (typeof window === "undefined") {
        return false;
      }
      return window.localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  });
  const setValue = React.useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setIsStored(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, serializer.stringify(valueToStore));
      }
    } catch (error) {
      onError(error);
    }
  }, [key, storedValue, serializer, onError]);
  const removeValue = React.useCallback(() => {
    try {
      setStoredValue(initialValue);
      setIsStored(false);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      onError(error);
    }
  }, [key, initialValue, onError]);
  return {
    value: storedValue,
    setValue,
    removeValue,
    isStored
  };
};

const useDebounce = (initialValue, options = {}) => {
  const { delay = 500, immediate = false } = options;
  const [value, setValue] = React.useState(initialValue);
  const [debouncedValue, setDebouncedValue] = React.useState(initialValue);
  const [isPending, setIsPending] = React.useState(false);
  React.useEffect(() => {
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
    isPending
  };
};

const useThrottle = (initialValue, interval = 500, options = {}) => {
  const { leading = true, trailing = true } = options;
  const [value, setValue] = React.useState(initialValue);
  const [throttledValue, setThrottledValue] = React.useState(initialValue);
  const [isThrottled, setIsThrottled] = React.useState(false);
  const lastUpdated = React.useRef(null);
  const timeoutRef = React.useRef(null);
  React.useEffect(() => {
    const now = Date.now();
    if (leading && lastUpdated.current === null) {
      lastUpdated.current = now;
      setThrottledValue(value);
      setIsThrottled(false);
      return;
    }
    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
      setIsThrottled(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else if (trailing) {
      setIsThrottled(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
        setIsThrottled(false);
        timeoutRef.current = null;
      }, interval - (now - (lastUpdated.current || 0)));
    }
  }, [value, interval, leading, trailing]);
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return {
    value,
    setValue,
    throttledValue,
    isThrottled
  };
};

const useClickAway = (options = {}) => {
  const {
    enabled = true,
    events = ["mousedown", "touchstart"],
    onClickAway
  } = options;
  const ref = React.useRef(null);
  const callbackRef = React.useRef(onClickAway);
  React.useLayoutEffect(() => {
    callbackRef.current = onClickAway;
  }, [onClickAway]);
  React.useEffect(() => {
    if (!enabled || !callbackRef.current) return;
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackRef.current?.(event);
      }
    };
    events.forEach((eventType) => {
      document.addEventListener(eventType, handler);
    });
    return () => {
      events.forEach((eventType) => {
        document.removeEventListener(eventType, handler);
      });
    };
  }, [enabled, events]);
  return { ref };
};

const useInView = (options = {}) => {
  const {
    threshold = 0,
    rootMargin = "0px",
    root,
    triggerOnce = false,
    onEnter,
    onLeave
  } = options;
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [entryCount, setEntryCount] = React.useState(0);
  const [hasEntered, setHasEntered] = React.useState(false);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          setInView(true);
          setEntryCount((prev) => prev + 1);
          if (!hasEntered) {
            setHasEntered(true);
            onEnter?.();
          }
        } else {
          setInView(false);
          if (!triggerOnce) {
            onLeave?.();
          }
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    );
    observer.observe(element);
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, triggerOnce, onEnter, onLeave, hasEntered]);
  return {
    ref,
    inView,
    entryCount,
    hasEntered
  };
};

const CHINESE_UNITS = {
  second: "\u79D2",
  minute: "\u5206\u949F",
  hour: "\u5C0F\u65F6",
  day: "\u5929",
  week: "\u5468",
  month: "\u4E2A\u6708",
  year: "\u5E74"
};
const ENGLISH_UNITS = {
  second: "second",
  minute: "minute",
  hour: "hour",
  day: "day",
  week: "week",
  month: "month",
  year: "year"
};
const useTimeAgo = (timestamp, options = {}) => {
  const {
    interval = 6e4,
    locale = "zh",
    relative = true,
    minUnit = "minute",
    autoUpdate = true
  } = options;
  const [timeAgo, setTimeAgo] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);
  const calculateTimeAgo = React.useCallback(() => {
    const now = Date.now();
    const date2 = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const diffInMs2 = now - date2.getTime();
    const diffInSeconds = Math.floor(diffInMs2 / 1e3);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
    const formatCustom = (value, unit) => {
      const units = locale === "zh" ? CHINESE_UNITS : ENGLISH_UNITS;
      if (locale === "zh") {
        if (unit === "second" && value === 0) return "\u521A\u521A";
        if (unit === "second") return `${value}\u79D2\u524D`;
        if (unit === "minute") return `${value}\u5206\u949F\u524D`;
        if (unit === "hour") return `${value}\u5C0F\u65F6\u524D`;
        if (unit === "day") return `${value}\u5929\u524D`;
        if (unit === "week") return `${value}\u5468\u524D`;
        if (unit === "month") return `${value}\u4E2A\u6708\u524D`;
        if (unit === "year") return `${value}\u5E74\u524D`;
      }
      if (locale === "en") {
        if (value === 1) return `1 ${units[unit]} ago`;
        return `${value} ${units[unit]}s ago`;
      }
      return `${value} ${units[unit]}${locale === "zh" ? "\u524D" : "s ago"}`;
    };
    const formatWithIntl = (value, unit) => {
      try {
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
        return rtf.format(-value, unit);
      } catch (e) {
        return formatCustom(value, unit);
      }
    };
    if (minUnit === "year" || diffInYears > 0 && minUnit !== "second") {
      return relative ? formatWithIntl(diffInYears, "year") : formatCustom(diffInYears, "year");
    } else if (minUnit === "month" || diffInMonths > 0 && minUnit !== "second" && minUnit !== "minute") {
      return relative ? formatWithIntl(diffInMonths, "month") : formatCustom(diffInMonths, "month");
    } else if (minUnit === "week" || diffInWeeks > 0 && minUnit !== "second" && minUnit !== "minute" && minUnit !== "hour") {
      return relative ? formatWithIntl(diffInWeeks, "week") : formatCustom(diffInWeeks, "week");
    } else if (minUnit === "day" || diffInDays > 0 && minUnit !== "second" && minUnit !== "minute") {
      return relative ? formatWithIntl(diffInDays, "day") : formatCustom(diffInDays, "day");
    } else if (minUnit === "hour" || diffInHours > 0 && minUnit !== "second") {
      return relative ? formatWithIntl(diffInHours, "hour") : formatCustom(diffInHours, "hour");
    } else if (minUnit === "minute" || diffInMinutes > 0) {
      return relative ? formatWithIntl(diffInMinutes, "minute") : formatCustom(diffInMinutes, "minute");
    } else {
      return relative ? formatWithIntl(diffInSeconds, "second") : formatCustom(diffInSeconds, "second");
    }
  }, [timestamp, locale, relative, minUnit]);
  React.useEffect(() => {
    setTimeAgo(calculateTimeAgo());
  }, [calculateTimeAgo]);
  React.useEffect(() => {
    if (!autoUpdate) return;
    const intervalId = setInterval(() => {
      setIsUpdating(true);
      setTimeAgo(calculateTimeAgo());
      setIsUpdating(false);
    }, interval);
    return () => {
      clearInterval(intervalId);
    };
  }, [interval, calculateTimeAgo, autoUpdate]);
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const diffInMs = Date.now() - date.getTime();
  return {
    timeAgo,
    timestamp: date,
    diffInMs,
    isUpdating
  };
};

const useQueue = (options = {}) => {
  const {
    initialItems = [],
    maxSize,
    overflowStrategy = "drop"
  } = options;
  const [queue, setQueue] = React.useState(initialItems);
  const enqueue = React.useCallback((item) => {
    setQueue((prevQueue) => {
      if (maxSize && prevQueue.length >= maxSize) {
        switch (overflowStrategy) {
          case "error":
            throw new Error("Queue is full");
          case "shift":
            return [...prevQueue.slice(1), item];
          case "drop":
          default:
            return prevQueue;
        }
      }
      return [...prevQueue, item];
    });
  }, [maxSize, overflowStrategy]);
  const enqueueMany = React.useCallback((items) => {
    setQueue((prevQueue) => {
      if (!maxSize) {
        return [...prevQueue, ...items];
      }
      const availableSpace = maxSize - prevQueue.length;
      if (availableSpace <= 0) {
        switch (overflowStrategy) {
          case "error":
            throw new Error("Queue is full");
          case "shift":
            const itemsToAdd2 = items.slice(-maxSize);
            return [...prevQueue.slice(items.length), ...itemsToAdd2];
          case "drop":
          default:
            return prevQueue;
        }
      }
      const itemsToAdd = items.slice(0, availableSpace);
      return [...prevQueue, ...itemsToAdd];
    });
  }, [maxSize, overflowStrategy]);
  const dequeue = React.useCallback(() => {
    let dequeuedItem;
    setQueue((prevQueue) => {
      if (prevQueue.length === 0) return prevQueue;
      dequeuedItem = prevQueue[0];
      return prevQueue.slice(1);
    });
    return dequeuedItem;
  }, []);
  const peek = React.useCallback(() => {
    return queue[0];
  }, [queue]);
  const peekLast = React.useCallback(() => {
    return queue[queue.length - 1];
  }, [queue]);
  const clear = React.useCallback(() => {
    setQueue([]);
  }, []);
  const isEmpty = React.useCallback(() => {
    return queue.length === 0;
  }, [queue]);
  const size = React.useCallback(() => {
    return queue.length;
  }, [queue]);
  const isFull = React.useCallback(() => {
    return maxSize ? queue.length >= maxSize : false;
  }, [queue, maxSize]);
  const queueString = React.useMemo(() => {
    return JSON.stringify(queue);
  }, [queue]);
  return {
    queue,
    enqueue,
    enqueueMany,
    dequeue,
    peek,
    peekLast,
    clear,
    isEmpty,
    size,
    isFull,
    queueString,
    full: isFull(),
    length: queue.length
  };
};

const usePolling = (callback, options) => {
  const {
    interval,
    immediate = false,
    enabled = true,
    maxRetries = -1,
    onError,
    onSuccess
  } = options;
  const [isPolling, setIsPolling] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);
  const intervalRef = React.useRef(null);
  const callbackRef = React.useRef(callback);
  const optionsRef = React.useRef({ maxRetries, onError, onSuccess });
  const isPollingRef = React.useRef(false);
  React.useEffect(() => {
    callbackRef.current = callback;
    optionsRef.current = { maxRetries, onError, onSuccess };
  }, [callback, maxRetries, onError, onSuccess]);
  const executeCallback = React.useCallback(async () => {
    if (!isPollingRef.current) return;
    try {
      setError(null);
      const result = await callbackRef.current();
      setData(result);
      setRetryCount(0);
      optionsRef.current.onSuccess?.(result);
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error(String(err));
      setError(error2);
      setRetryCount((prev) => {
        const newCount = prev + 1;
        if (optionsRef.current.maxRetries > 0 && newCount >= optionsRef.current.maxRetries) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsPolling(false);
          isPollingRef.current = false;
        }
        return newCount;
      });
      optionsRef.current.onError?.(error2);
    }
  }, []);
  const stop = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
    isPollingRef.current = false;
  }, []);
  const start = React.useCallback(() => {
    if (isPollingRef.current) return;
    setIsPolling(true);
    isPollingRef.current = true;
    setRetryCount(0);
    setError(null);
    executeCallback();
    intervalRef.current = setInterval(() => {
      executeCallback();
    }, interval);
  }, [interval, executeCallback]);
  const restart = React.useCallback(() => {
    stop();
    setTimeout(() => start(), 0);
  }, [stop, start]);
  React.useEffect(() => {
    if (immediate && enabled) {
      start();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  return {
    isPolling,
    start,
    stop,
    restart,
    retryCount,
    error,
    data
  };
};

const useMouse = (options = {}) => {
  const {
    enabled = true,
    target = typeof window !== "undefined" ? window : null,
    onMouseMove,
    onMouseEnter,
    onMouseLeave
  } = options;
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
    pageX: 0,
    pageY: 0,
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0
  });
  const [isInside, setIsInside] = React.useState(false);
  const [isMoving, setIsMoving] = React.useState(false);
  const updateMousePosition = React.useCallback((event) => {
    const mouseEvent = event;
    const newPosition = {
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
      pageX: mouseEvent.pageX,
      pageY: mouseEvent.pageY,
      screenX: mouseEvent.screenX,
      screenY: mouseEvent.screenY,
      clientX: mouseEvent.clientX,
      clientY: mouseEvent.clientY
    };
    setPosition(newPosition);
    setIsMoving(true);
    onMouseMove?.(newPosition);
    setTimeout(() => setIsMoving(false), 100);
  }, [onMouseMove]);
  const handleMouseEnter = React.useCallback((event) => {
    const mouseEvent = event;
    setIsInside(true);
    const newPosition = {
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
      pageX: mouseEvent.pageX,
      pageY: mouseEvent.pageY,
      screenX: mouseEvent.screenX,
      screenY: mouseEvent.screenY,
      clientX: mouseEvent.clientX,
      clientY: mouseEvent.clientY
    };
    onMouseEnter?.(newPosition);
  }, [onMouseEnter]);
  const handleMouseLeave = React.useCallback((event) => {
    const mouseEvent = event;
    setIsInside(false);
    const newPosition = {
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
      pageX: mouseEvent.pageX,
      pageY: mouseEvent.pageY,
      screenX: mouseEvent.screenX,
      screenY: mouseEvent.screenY,
      clientX: mouseEvent.clientX,
      clientY: mouseEvent.clientY
    };
    onMouseLeave?.(newPosition);
  }, [onMouseLeave]);
  const reset = React.useCallback(() => {
    setPosition({
      x: 0,
      y: 0,
      pageX: 0,
      pageY: 0,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0
    });
    setIsInside(false);
    setIsMoving(false);
  }, []);
  React.useEffect(() => {
    if (!enabled || !target) return;
    target.addEventListener("mousemove", updateMousePosition);
    target.addEventListener("mouseenter", handleMouseEnter);
    target.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      target.removeEventListener("mousemove", updateMousePosition);
      target.removeEventListener("mouseenter", handleMouseEnter);
      target.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled, target, updateMousePosition, handleMouseEnter, handleMouseLeave]);
  return {
    position,
    isInside,
    isMoving,
    reset
  };
};

const useFullscreen = (options = {}) => {
  const {
    onEnter,
    onExit,
    background,
    enabled = true
  } = options;
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const elementRef = React.useRef(null);
  const originalStylesRef = React.useRef({});
  const isSupported = typeof window !== "undefined" && !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
  const handleFullscreenChange = React.useCallback(() => {
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    setIsFullscreen(isFull);
    if (!isFull) {
      if (elementRef.current) {
        const element = elementRef.current;
        if (originalStylesRef.current.background !== void 0) {
          element.style.background = originalStylesRef.current.background;
        } else {
          element.style.removeProperty("background");
        }
      }
      if (originalStylesRef.current.overflow !== void 0) {
        document.body.style.overflow = originalStylesRef.current.overflow;
      } else {
        document.body.style.removeProperty("overflow");
      }
    }
  }, []);
  const enterFullscreen = React.useCallback(async () => {
    if (!enabled || !isSupported || !elementRef.current) {
      throw new Error("Fullscreen not supported or element not available");
    }
    try {
      setError(null);
      const element = elementRef.current;
      originalStylesRef.current = {
        background: element.style.background || "",
        overflow: document.body.style.overflow || ""
      };
      if (background) {
        element.style.background = background;
      }
      document.body.style.overflow = "hidden";
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      } else {
        throw new Error("Fullscreen API not supported");
      }
      onEnter?.();
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error(String(err));
      setError(error2);
      throw error2;
    }
  }, [enabled, isSupported, background, onEnter]);
  const exitFullscreen = React.useCallback(async () => {
    if (!enabled || !isSupported) {
      throw new Error("Fullscreen not supported");
    }
    try {
      setError(null);
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      } else {
        throw new Error("Exit fullscreen API not supported");
      }
      onExit?.();
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error(String(err));
      setError(error2);
      throw error2;
    }
  }, [enabled, isSupported, onExit]);
  const toggleFullscreen = React.useCallback(async () => {
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      await enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);
  React.useEffect(() => {
    if (!enabled || !isSupported) return;
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, [enabled, isSupported, handleFullscreenChange]);
  return {
    elementRef,
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isSupported,
    error
  };
};

const globalEventsMap = /* @__PURE__ */ new Map();
const useEventBus = (eventName, options = {}) => {
  const {
    autoCleanup = true,
    eventBus = globalEventsMap
  } = options;
  const eventsRef = React.useRef(eventBus);
  const cleanupRefs = React.useRef(/* @__PURE__ */ new Set());
  const getEventListeners = React.useCallback(() => {
    if (!eventsRef.current.has(eventName)) {
      eventsRef.current.set(eventName, /* @__PURE__ */ new Set());
    }
    return eventsRef.current.get(eventName);
  }, [eventName]);
  const on = React.useCallback((callback) => {
    const listeners = getEventListeners();
    listeners.add(callback);
    cleanupRefs.current.add(callback);
    return () => {
      listeners.delete(callback);
      cleanupRefs.current.delete(callback);
    };
  }, [getEventListeners]);
  const once = React.useCallback((callback) => {
    const onceCallback = (data) => {
      callback(data);
      off(onceCallback);
    };
    return on(onceCallback);
  }, [on]);
  const emit = React.useCallback((data) => {
    const listeners = getEventListeners();
    listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error("EventBus callback error:", error);
      }
    });
  }, [getEventListeners]);
  const off = React.useCallback((callback) => {
    const listeners = getEventListeners();
    listeners.delete(callback);
    cleanupRefs.current.delete(callback);
  }, [getEventListeners]);
  const reset = React.useCallback(() => {
    const listeners = getEventListeners();
    listeners.clear();
    cleanupRefs.current.clear();
  }, [getEventListeners]);
  const listenerCount = React.useCallback(() => {
    const listeners = getEventListeners();
    return listeners.size;
  }, [getEventListeners]);
  React.useEffect(() => {
    if (!autoCleanup) return;
    return () => {
      const listeners = getEventListeners();
      cleanupRefs.current.forEach((callback) => {
        listeners.delete(callback);
      });
      cleanupRefs.current.clear();
    };
  }, [autoCleanup, getEventListeners]);
  return {
    on,
    once,
    emit,
    off,
    reset,
    listenerCount
  };
};

const useElementSize = (options = {}) => {
  const {
    enabled = false,
    includeBorder = false,
    includePadding = false,
    onSizeChange,
    debounceMs = 0
  } = options;
  const ref = React.useRef(null);
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
    contentWidth: 0,
    contentHeight: 0,
    borderWidth: 0,
    borderHeight: 0,
    paddingWidth: 0,
    paddingHeight: 0
  });
  const [isObserving, setIsObserving] = React.useState(false);
  const observerRef = React.useRef(null);
  const debounceTimerRef = React.useRef(null);
  const optionsRef = React.useRef({ includeBorder, includePadding });
  React.useEffect(() => {
    optionsRef.current = { includeBorder, includePadding };
  }, [includeBorder, includePadding]);
  const calculateSize = React.useCallback((element) => {
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);
    const borderLeft = parseFloat(computedStyle.borderLeftWidth) || 0;
    const borderRight = parseFloat(computedStyle.borderRightWidth) || 0;
    const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
    const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
    const borderWidth = borderLeft + borderRight;
    const borderHeight = borderTop + borderBottom;
    const paddingWidth = paddingLeft + paddingRight;
    const paddingHeight = paddingTop + paddingBottom;
    const contentWidth = rect.width - borderWidth - paddingWidth;
    const contentHeight = rect.height - borderHeight - paddingHeight;
    return {
      width: optionsRef.current.includeBorder ? rect.width : contentWidth + paddingWidth,
      height: optionsRef.current.includeBorder ? rect.height : contentHeight + paddingHeight,
      contentWidth,
      contentHeight,
      borderWidth,
      borderHeight,
      paddingWidth,
      paddingHeight
    };
  }, []);
  const updateSize = React.useCallback(() => {
    const element = ref.current;
    if (!element) return;
    const newSize = calculateSize(element);
    setSize(newSize);
    onSizeChange?.(newSize);
  }, [calculateSize, onSizeChange]);
  const debouncedUpdateSize = React.useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (debounceMs > 0) {
      debounceTimerRef.current = setTimeout(updateSize, debounceMs);
    } else {
      updateSize();
    }
  }, [updateSize, debounceMs]);
  const startObserving = React.useCallback(() => {
    const element = ref.current;
    if (!element || isObserving) return;
    updateSize();
    if (typeof ResizeObserver !== "undefined") {
      observerRef.current = new ResizeObserver(() => {
        debouncedUpdateSize();
      });
      observerRef.current.observe(element);
      setIsObserving(true);
    }
  }, [isObserving, updateSize, debouncedUpdateSize]);
  const stopObserving = React.useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    setIsObserving(false);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  }, []);
  React.useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  return {
    ref,
    size,
    isObserving,
    startObserving,
    stopObserving,
    updateSize
  };
};

const useClipboard = (options = {}) => {
  const {
    showSuccess = true,
    successMessage = "\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",
    errorMessage = "\u590D\u5236\u5931\u8D25",
    onSuccess,
    onError,
    timeout = 3e3
  } = options;
  const [isCopying, setIsCopying] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState(null);
  const [error, setError] = React.useState(null);
  const canUseClipboardApi = typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function";
  const copyToClipboard = React.useCallback(async (text, copyOptions = {}) => {
    const {
      showSuccess: showSuccessOverride = showSuccess,
      successMessage: successMessageOverride = successMessage,
      errorMessage: errorMessageOverride = errorMessage,
      onSuccess: onSuccessOverride = onSuccess,
      onError: onErrorOverride = onError,
      timeout: timeoutOverride = timeout
    } = copyOptions;
    try {
      setIsCopying(true);
      setError(null);
      setIsCopied(false);
      let copySuccessful = false;
      if (canUseClipboardApi) {
        try {
          await navigator.clipboard.writeText(text);
          copySuccessful = true;
        } catch (err) {
          console.warn("Clipboard API failed, trying fallback:", err);
        }
      }
      if (!copySuccessful) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful) {
          copySuccessful = true;
        } else {
          throw new Error("Failed to copy via execCommand");
        }
      }
      if (!copySuccessful) {
        throw new Error("All copy methods failed");
      }
      setCopiedText(text);
      setIsCopied(true);
      if (showSuccessOverride) {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(successMessageOverride);
        } else {
          console.log(successMessageOverride);
        }
      }
      onSuccessOverride?.(text);
    } catch (err) {
      const copyError = err instanceof Error ? err : new Error(String(err));
      console.error("Failed to copy text:", copyError);
      setError(copyError);
      if (showSuccessOverride) {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(errorMessageOverride);
        } else {
          console.error(errorMessageOverride);
        }
      }
      onErrorOverride?.(copyError);
    } finally {
      setIsCopying(false);
      setTimeout(() => {
        setIsCopied(false);
        setCopiedText(null);
      }, timeoutOverride);
    }
  }, [canUseClipboardApi, showSuccess, successMessage, errorMessage, onSuccess, onError, timeout]);
  const readFromClipboard = React.useCallback(async () => {
    try {
      setError(null);
      if (canUseClipboardApi && navigator.clipboard.readText) {
        return await navigator.clipboard.readText();
      } else {
        throw new Error("Clipboard read API not supported");
      }
    } catch (err) {
      const readError = err instanceof Error ? err : new Error(String(err));
      setError(readError);
      throw readError;
    }
  }, [canUseClipboardApi]);
  const reset = React.useCallback(() => {
    setIsCopying(false);
    setIsCopied(false);
    setCopiedText(null);
    setError(null);
  }, []);
  return {
    copyToClipboard,
    readFromClipboard,
    isCopying,
    isCopied,
    copiedText,
    error,
    canUseClipboardApi,
    reset
  };
};

const useHover = (options = {}) => {
  const {
    onEnter,
    onLeave,
    enabled = true,
    delayEnter = 0,
    delayLeave = 0
  } = options;
  const [isHovered, setIsHovered] = React.useState(false);
  const ref = React.useRef(null);
  const enterTimerRef = React.useRef(null);
  const leaveTimerRef = React.useRef(null);
  const clearTimers = React.useCallback(() => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);
  const handleMouseEnter = React.useCallback(() => {
    if (!enabled) return;
    clearTimers();
    if (delayEnter > 0) {
      enterTimerRef.current = setTimeout(() => {
        setIsHovered(true);
        onEnter?.();
      }, delayEnter);
    } else {
      setIsHovered(true);
      onEnter?.();
    }
  }, [enabled, delayEnter, onEnter, clearTimers]);
  const handleMouseLeave = React.useCallback(() => {
    if (!enabled) return;
    clearTimers();
    if (delayLeave > 0) {
      leaveTimerRef.current = setTimeout(() => {
        setIsHovered(false);
        onLeave?.();
      }, delayLeave);
    } else {
      setIsHovered(false);
      onLeave?.();
    }
  }, [enabled, delayLeave, onLeave, clearTimers]);
  const setHovered = React.useCallback((hovered) => {
    clearTimers();
    setIsHovered(hovered);
    if (hovered) {
      onEnter?.();
    } else {
      onLeave?.();
    }
  }, [onEnter, onLeave, clearTimers]);
  React.useEffect(() => {
    const element = ref.current;
    if (element) {
      if (enabled) {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      } else {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    }
    return () => {
      if (element) {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
      clearTimers();
    };
  }, [enabled, handleMouseEnter, handleMouseLeave, clearTimers]);
  return {
    ref,
    isHovered,
    setHovered
  };
};

const useScrolling = (options = {}) => {
  const {
    onScrollStart,
    onScrollEnd,
    onScroll,
    enabled = true,
    scrollEndDelay = 150,
    horizontal = true,
    vertical = true
  } = options;
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState(null);
  const [scrollPosition, setScrollPosition] = React.useState({
    scrollTop: 0,
    scrollLeft: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    clientWidth: 0,
    clientHeight: 0
  });
  const ref = React.useRef(null);
  const scrollEndTimerRef = React.useRef(null);
  const lastScrollTopRef = React.useRef(0);
  const lastScrollLeftRef = React.useRef(0);
  const isScrollingRef = React.useRef(false);
  const callbacksRef = React.useRef({
    onScrollStart,
    onScrollEnd,
    onScroll,
    enabled,
    scrollEndDelay,
    horizontal,
    vertical
  });
  React.useEffect(() => {
    callbacksRef.current = {
      onScrollStart,
      onScrollEnd,
      onScroll,
      enabled,
      scrollEndDelay,
      horizontal,
      vertical
    };
  });
  const clearScrollEndTimer = React.useCallback(() => {
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = null;
    }
  }, []);
  const handleScroll = React.useCallback((event) => {
    const { enabled: enabled2, onScrollStart: onScrollStart2, onScrollEnd: onScrollEnd2, onScroll: onScroll2, scrollEndDelay: scrollEndDelay2, horizontal: horizontal2, vertical: vertical2 } = callbacksRef.current;
    if (!enabled2) return;
    const element = event.target;
    if (!element) return;
    const newScrollPosition = {
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight
    };
    setScrollPosition(newScrollPosition);
    const currentScrollTop = element.scrollTop;
    const currentScrollLeft = element.scrollLeft;
    const topChanged = currentScrollTop !== lastScrollTopRef.current;
    const leftChanged = currentScrollLeft !== lastScrollLeftRef.current;
    let direction = null;
    if (topChanged && leftChanged) {
      direction = "both";
    } else if (topChanged && vertical2) {
      direction = "vertical";
    } else if (leftChanged && horizontal2) {
      direction = "horizontal";
    }
    if (direction) {
      setScrollDirection(direction);
    }
    lastScrollTopRef.current = element.scrollTop;
    lastScrollLeftRef.current = element.scrollLeft;
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      setIsScrolling(true);
      onScrollStart2?.();
    }
    clearScrollEndTimer();
    scrollEndTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      setIsScrolling(false);
      setScrollDirection(null);
      onScrollEnd2?.();
    }, scrollEndDelay2);
    onScroll2?.(event);
  }, [clearScrollEndTimer]);
  const handleMouseLeave = React.useCallback(() => {
    const { enabled: enabled2, onScrollEnd: onScrollEnd2 } = callbacksRef.current;
    if (!enabled2) return;
    clearScrollEndTimer();
    isScrollingRef.current = false;
    setIsScrolling(false);
    setScrollDirection(null);
    onScrollEnd2?.();
  }, [clearScrollEndTimer]);
  const setScrolling = React.useCallback((scrolling) => {
    const { onScrollStart: onScrollStart2, onScrollEnd: onScrollEnd2 } = callbacksRef.current;
    clearScrollEndTimer();
    isScrollingRef.current = scrolling;
    setIsScrolling(scrolling);
    if (!scrolling) {
      setScrollDirection(null);
      onScrollEnd2?.();
    } else {
      onScrollStart2?.();
    }
  }, [clearScrollEndTimer]);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const position = {
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight
    };
    setScrollPosition(position);
    lastScrollTopRef.current = position.scrollTop;
    lastScrollLeftRef.current = position.scrollLeft;
    element.addEventListener("scroll", handleScroll, { passive: true });
    element.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      element.removeEventListener("scroll", handleScroll);
      element.removeEventListener("mouseleave", handleMouseLeave);
      clearScrollEndTimer();
    };
  }, []);
  return {
    ref,
    isScrolling,
    scrollDirection,
    scrollPosition,
    setScrolling
  };
};

const useUpdateEffect = (effect, deps = []) => {
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
  }, [effect, ...deps]);
};

const useWatermark = (options = {}) => {
  const {
    text = "\u6C34\u5370",
    image,
    fontSize = 16,
    color = "#999",
    opacity = 0.3,
    rotate = -15,
    gap = [100, 100],
    offset = [0, 0],
    zIndex = 1e3,
    fontFamily = "Arial, sans-serif",
    fontWeight = "normal",
    width = 200,
    height = 100,
    enabled = true
  } = options;
  const ref = React.useRef(null);
  const watermarkRef = React.useRef(null);
  const optionsRef = React.useRef(options);
  React.useEffect(() => {
    optionsRef.current = { ...options };
  });
  const createWatermark = React.useCallback(() => {
    if (!ref.current || !enabled) return;
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = null;
    }
    const element = ref.current;
    element.getBoundingClientRect();
    const watermark = document.createElement("div");
    watermark.style.position = "absolute";
    watermark.style.top = "0";
    watermark.style.left = "0";
    watermark.style.width = "100%";
    watermark.style.height = "100%";
    watermark.style.pointerEvents = "none";
    watermark.style.zIndex = zIndex.toString();
    watermark.style.overflow = "hidden";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = width;
    canvas.height = height;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (image) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(rotate * Math.PI / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();
        createWatermarkPattern();
      };
      img.src = image;
    } else {
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(rotate * Math.PI / 180);
      ctx.fillText(text, 0, 0);
      ctx.restore();
      createWatermarkPattern();
    }
    function createWatermarkPattern() {
      const dataURL = canvas.toDataURL();
      const pattern = `url(${dataURL})`;
      watermark.style.backgroundImage = pattern;
      watermark.style.backgroundRepeat = "repeat";
      watermark.style.backgroundSize = `${gap[0]}px ${gap[1]}px`;
      watermark.style.backgroundPosition = `${offset[0]}px ${offset[1]}px`;
      element.style.position = "relative";
      element.appendChild(watermark);
      watermarkRef.current = watermark;
    }
  }, [text, image, fontSize, color, opacity, rotate, gap, offset, zIndex, fontFamily, fontWeight, width, height, enabled]);
  const clear = React.useCallback(() => {
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = null;
    }
  }, []);
  const setOptions = React.useCallback((newOptions) => {
    Object.assign(optionsRef.current, newOptions);
    createWatermark();
  }, [createWatermark]);
  React.useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    createWatermark();
    const resizeObserver = new ResizeObserver(() => {
      createWatermark();
    });
    resizeObserver.observe(element);
    return () => {
      resizeObserver.disconnect();
      clear();
    };
  }, [createWatermark, clear]);
  return {
    ref,
    setOptions,
    clear,
    options: optionsRef.current
  };
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = ""
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500"
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      className: classes,
      disabled,
      onClick
    },
    children
  );
};

exports.Button = Button;
exports.useClickAway = useClickAway;
exports.useClipboard = useClipboard;
exports.useCounter = useCounter;
exports.useDebounce = useDebounce;
exports.useElementSize = useElementSize;
exports.useEventBus = useEventBus;
exports.useFullscreen = useFullscreen;
exports.useHover = useHover;
exports.useInView = useInView;
exports.useLocalStorage = useLocalStorage;
exports.useMouse = useMouse;
exports.usePolling = usePolling;
exports.usePrevious = usePrevious;
exports.useQueue = useQueue;
exports.useScrolling = useScrolling;
exports.useThrottle = useThrottle;
exports.useTimeAgo = useTimeAgo;
exports.useToggle = useToggle;
exports.useUpdateEffect = useUpdateEffect;
exports.useWatermark = useWatermark;
exports.useWindowSize = useWindowSize;
//# sourceMappingURL=index.js.map
