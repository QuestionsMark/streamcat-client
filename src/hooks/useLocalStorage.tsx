import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage-helper.util';

type LocalStorageValue<T> = [T, Dispatch<SetStateAction<T>>]

export function useLocalStorage<T>(key: string, initialValue: T): LocalStorageValue<T> {

    const [value, setValue] = useState<T>(() => {
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