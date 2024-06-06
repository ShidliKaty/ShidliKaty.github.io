import { useTodos } from '../context/useTodos';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
    const { todos } = useTodos();

    return (
        <ul className="new-todo-list">
            {todos.length === 0 ? (
                <div className="todo-item">No Items</div>
            ) : null}
            {todos.map(todo => {
                return <TodoItem key={todo.id} {...todo} />;
            })}
        </ul>
    );
};
