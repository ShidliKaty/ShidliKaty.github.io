import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import { useTodos } from '../../context/useTodos';

jest.mock('../../context/useTodos');

const mockUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;

const mockTodos = [
    { id: '1', name: 'First Todo', completed: false },
    { id: '2', name: 'Second Todo', completed: true },
    { id: '3', name: 'Third Todo', completed: false },
];

describe('TodoList', () => {
    beforeEach(() => {
        mockUseTodos.mockReturnValue({
            todos: [],
            showActive: jest.fn(),
            showCompleted: jest.fn(),
            showAll: jest.fn(),
            clearCompleted: jest.fn(),
            addTodo: jest.fn(),
            toggleCompleted: jest.fn(),
        });
    });

    test('should be no items', () => {
        render(<TodoList />);
        expect(screen.getByText('No Items')).toBeInTheDocument();
    });

    test('should be todos', () => {
        mockUseTodos.mockReturnValue({
            todos: mockTodos,
            showActive: jest.fn(),
            showCompleted: jest.fn(),
            showAll: jest.fn(),
            clearCompleted: jest.fn(),
            addTodo: jest.fn(),
            toggleCompleted: jest.fn(),
        });

        render(<TodoList />);

        expect(screen.queryByText('No Items')).not.toBeInTheDocument();
        mockTodos.forEach(todo => {
            expect(screen.getByText(todo.name)).toBeInTheDocument();
        });
    });
});
