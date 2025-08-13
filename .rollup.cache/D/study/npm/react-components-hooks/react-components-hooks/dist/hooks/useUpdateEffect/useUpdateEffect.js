import { useEffect, useRef } from 'react';
export const useUpdateEffect = (effect, deps = []) => {
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        return effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effect, ...deps]);
};
//# sourceMappingURL=useUpdateEffect.js.map