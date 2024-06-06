import { Todo } from '../context/Todos';
import { useTodos } from '../context/useTodos';

export const TodoItem = ({ id, name, completed }: Todo) => {
    const { toggleCompleted } = useTodos();

    return (
        <li className="todo-item" key={id}>
            <label className="todo-item-label">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={e => toggleCompleted(id, e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="todo-text">{name}</span>
            </label>
        </li>
    );
};
