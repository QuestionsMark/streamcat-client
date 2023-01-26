import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage-helper.util';

export function useLocalStorage(key: string, initialValue: any) {

    const [value, setValue] = useState(() => {
        const storageValue = getLocalStorage(key);
        if (storageValue !== null) return storageValue;
        if (typeof initialValue === 'function') {
            return initialValue();
        }
        return initialValue;
    });

    useEffect(() => {
        setLocalStorage(key, value);
    }, [value, key]);

    return [value, setValue];
}