import { FormEvent, useRef } from 'react';
import { useTodos } from '../context/useTodos';

export const NewTodoForm = () => {
    const { addTodo } = useTodos();

    const todoName = useRef<HTMLInputElement>(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const name = todoName.current?.value;

        if (!name) return;

        addTodo(name);

        if (todoName.current) {
            todoName.current.value = '';
        }
    }
    return (
        <form className="new-todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="What needs to be done?"
                ref={todoName}
            />
        </form>
    );
};
