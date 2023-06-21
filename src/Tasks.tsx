import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };

  const handleAddTodo = () => {
    if (!todoInput) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      task: todoInput,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodoInput('');
  };

  const handleToggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="AddTodo">
        <input type="text" value={todoInput} onChange={handleInputChange} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="TodoList">
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.task}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;