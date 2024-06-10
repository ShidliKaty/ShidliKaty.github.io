import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

type Todo = {
    id: string;
    name: string;
    completed: boolean;
};

const key = 'testKey';
const initialValue: Todo[] = [
    { id: '1', name: 'Test Todo 1', completed: false },
];

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should be initialValue if localStorage is empty', () => {
        const { result } = renderHook(() => useLocalStorage(key, initialValue));

        expect(result.current[0]).toEqual(initialValue);
        expect(localStorage.getItem(key)).toEqual(JSON.stringify(initialValue));
    });

    test('should be value from localStorage', () => {
        localStorage.setItem(key, JSON.stringify(initialValue));

        const { result } = renderHook(() => useLocalStorage(key, []));

        expect(result.current[0]).toEqual(initialValue);
    });

    test('should update localStorage', () => {
        const { result } = renderHook(() => useLocalStorage(key, []));

        const newValue: Todo[] = [
            { id: '2', name: 'Test Todo 2', completed: true },
        ];

        act(() => {
            result.current[1](newValue);
        });

        expect(localStorage.getItem(key)).toEqual(JSON.stringify(newValue));
    });
});
