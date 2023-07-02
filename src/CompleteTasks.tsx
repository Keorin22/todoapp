import React, { useState } from 'react';
import { Task } from './store/types';
import { taskApi } from './services/TasksApi';



const CompleteTasks: React.FC = () => {
  const [todoInput, setTodoInput] = useState('');
  const {data: todos} = taskApi.useGetTasksQuery()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };
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
    <div className="CompleteTasks">
      Выполненные задачи
      <ul className="TodoList">
        {todos && todos.map((todo) => (
          todo.completed && (<li key={todo.id} className='test'>
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
  )
}

export default CompleteTasks;