import React, { useState, useEffect } from 'react';
import axios from 'axios';



const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:5000/api/todos');
        setTodos(response.data);
    };

    const addTodo = async () => {
      if (!newTodo.trim()) return;
      console.log(newTodo); // Log the new task being added
      const response = await axios.post('http://localhost:5000/api/todos', { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
  };
  

    const toggleTodo = async (id, completed) => {
        const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">To-Do App</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="form-control"
                />
                <button
                    onClick={addTodo}
                    className="btn btn-primary"
                >
                    Add
                </button>
            </div>
            <ul className="list-group">
                {todos.map((todo) => (
                    <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span
                            onClick={() => toggleTodo(todo._id, todo.completed)}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {todo.title}
                        </span>
                        <button 
                            onClick={() => deleteTodo(todo._id)}
                            className="btn btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
