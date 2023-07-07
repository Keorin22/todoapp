/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from './utils/appDispatch';
import { useSelector } from 'react-redux';
import { tasksSelector } from './store/selector';
import { StateAuth, Task } from './store/types';
import { getAccessToken, taskApi } from './services/TasksApi';
import { RootState } from './store/store';
import { Navigate } from 'react-router-dom';


const Tasks: React.FC = () => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [todoInput, setTodoInput] = useState('');
  const {data: todos} = taskApi.useGetTasksQuery()
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  }; 
  // const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  // if (!isAuth) {
  //   return <Navigate to="/" />;
  // }
  const [createTodo] = taskApi.useCreateTaskMutation();
  const [updateTodo] = taskApi.useUpdateTaskMutation();
  const [deleteTodo] = taskApi.useDeleteTaskMutation();
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setIsOpen] = useState(false);
  const showPopup = () => {
    setIsOpen(true);
  };

  const hidePopup = () => {
    setIsOpen(false);
    setTodoInput('');
  };
  useEffect(() =>{    
    if(inputRef.current && isOpen){
      inputRef.current.focus()
    }
  }, )
  return (
      <div className="bg-blue-500">
      <h1>Todo App</h1>
      <button onClick={showPopup} >Добавить Задачу</button>

      {isOpen && (
        <form>

        
        <div >
          {/* <div className="overlay"> */}
          <input
            type="text"
            value={todoInput}
            onChange={e => setTodoInput(e.target.value)}
            placeholder="Введите todo"
            ref={inputRef}
          />
          <button onClick={handleAddTodo}>Добавить</button>
          <button onClick={hidePopup}>Отмена</button>
        </div>
        </form>
        // </div>
      )}

      {/* <div className="AddTodo">
        <input type="text" value={todoInput} onChange={handleInputChange} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div> */}
      <ul>
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