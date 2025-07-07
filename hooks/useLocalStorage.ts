import { useState, useEffect } from 'react';

export function useLocalStorage<T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const serializedValue = JSON.stringify(storedValue);
            window.localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error setting item ${key} in localStorage`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}
