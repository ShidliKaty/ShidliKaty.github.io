import { ReactNode, createContext, useState } from 'react';
import { useLocalStorage } from '../lib/useLocalStorage';

export type Todo = {
    id: string;
    name: string | undefined;
    completed: boolean;
};

type TodoContext = {
    todos: Todo[];
    addTodo: (todoName: string | undefined) => void;
    toggleCompleted: (id: string, completed: boolean) => void;
    showCompleted: () => void;
    showActive: () => void;
    showAll: () => void;
    clearCompleted: () => void;
};

export const Context = createContext<TodoContext | null>(null);

type TodoProviderProps = {
    children: ReactNode;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
    const [todos, setTodos] = useLocalStorage('TODOS', []);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const filteredTodos = todos.filter(todo => {
        if (isActive && todo.completed) {
            return false;
        } else if (isCompleted && !todo.completed) {
            return false;
        }
        return todo;
    });

    function addTodo(todoName: string | undefined) {
        setTodos(prev => [
            ...prev,
            { id: crypto.randomUUID(), completed: false, name: todoName },
        ]);
    }

    function toggleCompleted(id: string, completed: boolean) {
        setTodos(prev => {
            return prev.map(todo => {
                return todo.id === id ? { ...todo, completed } : todo;
            });
        });
    }

    function showCompleted() {
        setIsActive(false);
        setIsCompleted(true);
    }

    function showActive() {
        setIsCompleted(false);
        setIsActive(true);
    }

    function showAll() {
        setIsCompleted(false);
        setIsActive(false);
    }

    function clearCompleted() {
        setTodos(prev => {
            return prev.filter(todo => !todo.completed);
        });
    }

    return (
        <Context.Provider
            value={{
                todos: filteredTodos,
                addTodo,
                toggleCompleted,
                showCompleted,
                showActive,
                showAll,
                clearCompleted,
            }}
        >
            {children}
        </Context.Provider>
    );
};
