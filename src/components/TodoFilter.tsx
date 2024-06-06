import { useState } from 'react';
import { useTodos } from '../context/useTodos';

export const TodoFilter = () => {
    const { todos, showActive, showCompleted, showAll, clearCompleted } =
        useTodos();

    const [activeButton, setActiveButton] = useState('all');

    const todosLeft = todos.filter(todo => !todo.completed).length;

    const onAll = () => {
        setActiveButton('all');
        showAll();
    };

    const onActive = () => {
        setActiveButton('active');
        showActive();
    };

    const onCompleted = () => {
        setActiveButton('completed');
        showCompleted();
    };

    const onClearCompleted = () => {
        setActiveButton('all');
        clearCompleted();
        showAll();
    };

    return (
        <div className="filter-block">
            <p>{`${todosLeft} items left`}</p>
            <div className="filter-group">
                <button
                    className={activeButton === 'all' ? 'active' : ''}
                    onClick={onAll}
                >
                    All
                </button>
                <button
                    className={activeButton === 'active' ? 'active' : ''}
                    onClick={onActive}
                >
                    Active
                </button>
                <button
                    className={activeButton === 'completed' ? 'active' : ''}
                    onClick={onCompleted}
                >
                    Completed
                </button>
            </div>
            <button onClick={onClearCompleted}>Clear completed</button>
        </div>
    );
};
