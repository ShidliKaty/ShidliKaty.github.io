import { useContext } from 'react';
import { Context } from './Todos';

export function useTodos() {
    const todosContext = useContext(Context);
    if (todosContext === null) {
        throw new Error('useEvents must be used within an EventsProvider');
    }
    return todosContext;
}
