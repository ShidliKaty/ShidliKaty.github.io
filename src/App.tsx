import { NewTodoForm } from './components/NewTodoForm/NewTodoForm';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { TodoProvider } from './context/Todos';

function App() {
    return (
        <TodoProvider>
            <h1>todos</h1>
            <div className="todos-block">
                <NewTodoForm />
                <TodoList />
                <TodoFilter />
            </div>
        </TodoProvider>
    );
}

export default App;
