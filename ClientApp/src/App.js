import React, { useEffect, useState } from 'react';
import './App.css';

function TodoForm({ addTodo }) {
    const [value, setValue] = React.useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
};
    return (
        <form onSubmit={handleSubmit} >
            <input
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}


function Todo({ todo, index, completeTodo }) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.text}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
        </div>
    );
}

function App() {
    const [todos, setTodos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null)

    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);

        
    };

    useEffect(() => {
        fetch("http://localhost:3000")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTodos(result.todos);
                }
        })

    useEffect(() => {
        fetch("http://localhost:3000")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTodos(result.todos);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="app">
                <div className="todo-list">
                    {todos.map((todo, index) => (
                        <Todo
                            key={index}
                            index={index}
                            todo={todo}
                            completeTodo={completeTodo}
                            removeTodo={removeTodo}
                        />
                    ))}
                    <TodoForm addTodo={addTodo} />
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                    />
                ))}
                <TodoForm addTodo={addTodo} />
            </div>
        </div>
    );
}

export default App;
