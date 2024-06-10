import { render, screen, fireEvent } from '@testing-library/react';
import { NewTodoForm } from './NewTodoForm';
import { useTodos } from '../../context/useTodos';

jest.mock('../../context/useTodos');

const mockUseTodos = useTodos as jest.Mock;

describe('NewTodoForm', () => {
    let addTodo: jest.Mock;

    beforeEach(() => {
        addTodo = jest.fn();
        mockUseTodos.mockReturnValue({
            addTodo,
        });
    });

    test('renders the input field', () => {
        render(<NewTodoForm />);
        expect(
            screen.getByPlaceholderText('What needs to be done?'),
        ).toBeInTheDocument();
    });

    test('calls addTodo with input value when form is submitted', () => {
        render(<NewTodoForm />);
        const input = screen.getByPlaceholderText(
            'What needs to be done?',
        ) as HTMLInputElement;
        const form = screen.getByTestId('new-todo-form');

        fireEvent.change(input, { target: { value: 'New Task' } });
        console.log('Input value after change:', input.value);
        expect(input.value).toBe('New Task');

        fireEvent.submit(form);
        console.log('Form submitted');
        console.log('addTodo calls:', addTodo.mock.calls);

        expect(addTodo).toHaveBeenCalledWith('New Task');
        expect(input.value).toBe('');
    });

    test('does not call addTodo when input is empty', () => {
        render(<NewTodoForm />);
        const form = screen.getByTestId('new-todo-form');

        fireEvent.submit(form);

        expect(addTodo).not.toHaveBeenCalled();
    });
});
