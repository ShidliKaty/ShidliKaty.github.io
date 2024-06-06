import { useEffect, useState } from 'react';
import { Todo } from '../context/Todos';

export const useLocalStorage = (key: string, initialValue: Todo[]) => {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);

        if (jsonValue == null) return initialValue;

        return JSON.parse(jsonValue) as Todo[];
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
};
