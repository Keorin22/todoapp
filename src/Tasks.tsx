import React, { useState } from 'react';
import './App.css';
import { useAppDispatch } from './utils/appDispatch';
import { useSelector } from 'react-redux';
import { tasksSelector } from './store/selector';
import { Task } from './store/types';
// import { addTask, changeTodoStatus, completeTask, createTodo, deleteTask, fetchRemovetodo, fetchTodos } from './store/slice';
import { taskApi } from './services/TasksApi';


const Tasks: React.FC = () => {
  const dispatch = useAppDispatch()
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const todos = useSelector(tasksSelector)
  const [todoInput, setTodoInput] = useState('');
  const {data: todos} = taskApi.useGetTasksQuery()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };
  const useDeleteTaskMutation = taskApi.endpoints.deleteTask.useMutation;
  // React.useEffect(() => {
  //   dispatch(fetchTodos());
  //   // dispatch(fetchTags());
  // }, todos);
  console.log(todos)
  const handleAddTodo = () => {
    if (!todoInput) {
      return;
    }

    // const newTodo: Task = {
    //   id: todos.length + 1,
    //   todo: todoInput,
    //   completed: false,
    // };
    // dispatch(addTask(newTodo))
    // dispatch(createTodo({ todo: todoInput, id: (todos.length+1) }))
    console.log(todoInput)
    // setTodos([...todos, newTodo]);
    setTodoInput('');
  };

  const handleToggleCompleted = (todo:Task) => {
    // dispatch(completeTask(todo))todo
    // dispatch(changeTodoStatus({ id: todo.id }))
    // taskApi.useUpdateTaskMutation(todo)
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const result = useDeleteTaskMutation(id);
      // обработка успешного удаления задачи
    } catch (error) {
      // обработка ошибки при удалении задачи
    }
  };

  return (
    // <div className="App">
      <div>
      <h1>Todo App</h1>
      <div className="AddTodo">
        <input type="text" value={todoInput} onChange={handleInputChange} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="TodoList">
        {todos && todos.map((todo) => (
          <li key={todo.id}>
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
        ))}
      </ul>
    </div>
  );
}

export default Tasks;