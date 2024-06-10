import { fireEvent, render, screen } from '@testing-library/react';
import { useTodos } from '../../context/useTodos';
import { TodoFilter } from './TodoFilter';

jest.mock('../../context/useTodos');

const mockUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;

const mockTodos = [
    { id: '1', name: 'First Todo', completed: false },
    { id: '2', name: 'Second Todo', completed: true },
    { id: '3', name: 'Third Todo', completed: false },
];

describe('TodoFilter', () => {
    beforeEach(() => {
        mockUseTodos.mockReturnValue({
            todos: mockTodos,
            showActive: jest.fn(),
            showCompleted: jest.fn(),
            showAll: jest.fn(),
            clearCompleted: jest.fn(),
            addTodo: jest.fn(),
            toggleCompleted: jest.fn(),
        });
    });

    test('should be correct number of items left', () => {
        render(<TodoFilter />);
        expect(screen.getByText('2 items left')).toBeInTheDocument();
    });

    test('should be all filter buttons', () => {
        render(<TodoFilter />);
        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.getByText('Clear completed')).toBeInTheDocument();
    });

    test('clicking "All" button sets activeButton to "all" and calls showAll', () => {
        render(<TodoFilter />);
        fireEvent.click(screen.getByText('All'));
        const { showAll } = mockUseTodos();
        expect(showAll).toHaveBeenCalled();
        expect(screen.getByText('All')).toHaveClass('active');
    });

    test('clicking "Active" button sets activeButton to "active" and calls showActive', () => {
        render(<TodoFilter />);
        fireEvent.click(screen.getByText('Active'));
        const { showActive } = mockUseTodos();
        expect(showActive).toHaveBeenCalled();
        expect(screen.getByText('Active')).toHaveClass('active');
    });

    test('clicking "Completed" button sets activeButton to "completed" and calls showCompleted', () => {
        render(<TodoFilter />);
        fireEvent.click(screen.getByText('Completed'));
        const { showCompleted } = mockUseTodos();
        expect(showCompleted).toHaveBeenCalled();
        expect(screen.getByText('Completed')).toHaveClass('active');
    });

    test('clicking "Clear completed" button sets activeButton to "all", calls clearCompleted and showAll', () => {
        render(<TodoFilter />);
        fireEvent.click(screen.getByText('Clear completed'));
        const { clearCompleted, showAll } = mockUseTodos();
        expect(clearCompleted).toHaveBeenCalled();
        expect(showAll).toHaveBeenCalled();
        expect(screen.getByText('All')).toHaveClass('active');
    });
});
