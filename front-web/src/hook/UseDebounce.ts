import { useCallback, useRef } from "react";


export const useDebounce = (delay = 2000) => {
    const debouncing = useRef<NodeJS.Timeout>();
    // const isFirstTime = useRef<NodeJS.Timeout>();
    const debounce = useCallback((func: () => void) => {

        if (debouncing.current){
            clearTimeout(debouncing.current);
        }

        debouncing.current = setTimeout(() => func(), delay);
    }, [delay]);
    return{debounce};
};