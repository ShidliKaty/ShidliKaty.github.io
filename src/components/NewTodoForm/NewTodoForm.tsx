import { FormEvent, useRef } from 'react';
import { useTodos } from '../../context/useTodos';

export const NewTodoForm = () => {
    const { addTodo } = useTodos();

    const todoName = useRef<HTMLInputElement>(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        console.log('Form submitted'); // Добавляем лог для отладки

        const name = todoName.current?.value;

        if (!name) return;

        addTodo(name);

        if (todoName.current) {
            todoName.current.value = '';
        }

        console.log('Todo added:', name); // Добавляем лог для отладки
    }
    return (
        <form
            className="new-todo-form"
            onSubmit={handleSubmit}
            data-testid="new-todo-form"
        >
            <input
                type="text"
                placeholder="What needs to be done?"
                ref={todoName}
            />
        </form>
    );
};
