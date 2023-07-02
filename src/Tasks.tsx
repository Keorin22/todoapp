import React, { useState } from 'react';
import './App.css';
import { useAppDispatch } from './utils/appDispatch';
import { useSelector } from 'react-redux';
import { tasksSelector } from './store/selector';
import { StateAuth, Task } from './store/types';
import { taskApi } from './services/TasksApi';
import { RootState } from './store/store';


const Tasks: React.FC = () => {
  const dispatch = useAppDispatch()

  const [todoInput, setTodoInput] = useState('');
  const {data: todos} = taskApi.useGetTasksQuery()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };
  const userData = useSelector((state: RootState) => state.auth.data)
  console.log(userData)
  const [createTodo] = taskApi.useCreateTaskMutation();
  const [updateTodo] = taskApi.useUpdateTaskMutation();
  const [deleteTodo] = taskApi.useDeleteTaskMutation();
  const useDeleteTaskMutation = taskApi.endpoints.deleteTask.useMutation;
  const handleAddTodo = async () => {
    if (!todoInput) {
      return;
    }

    const newTodo: Task = {
      id: 1,
      todo: todoInput,
      completed: false,
    };    
    await createTodo(newTodo).unwrap()
    setIsOpen(false);
    setTodoInput('');
  };

  const handleToggleCompleted = async (todo:Task) => {
    await updateTodo(todo)
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      deleteTodo(id)
    } catch (error) {
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const showPopup = () => {
    setIsOpen(true);
  };

  const hidePopup = () => {
    setIsOpen(false);
    setTodoInput('');
  };

  return (
      <div>
      <h1>Todo App</h1>
      <button onClick={showPopup} className='AddTodo'>Добавить Задачу</button>

      {isOpen && (
        <div className="popup-container">
          {/* <div className="overlay"> */}
          <input
            type="text"
            value={todoInput}
            onChange={e => setTodoInput(e.target.value)}
            placeholder="Введите todo"
          />
          <button onClick={handleAddTodo}>Добавить</button>
          <button onClick={hidePopup}>Отмена</button>
        </div>
        // </div>
      )}

      {/* <div className="AddTodo">
        <input type="text" value={todoInput} onChange={handleInputChange} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div> */}
      <ul className="TodoList">
        {todos && todos.map((todo) => (
          !todo.completed && (<li key={todo.id} className='test'>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.todo}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
          )
        
        ))}
      </ul>
    </div>
  );
}

export default Tasks;