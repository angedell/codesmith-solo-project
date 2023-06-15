import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Todo from '../Todo/Todo.jsx';

function TDlist({ socket }) {
  const todos = useSelector((state) => state.todos.todos);
  const todosToBe = useSelector((state) => state.todos.todosToBe);

  const arrTodosToBe = todosToBe.map((todo) => <Todo key={todo.id} todo={todo} toBe socket={socket} />);
  const arrTodos = todos.map((todo) => <Todo key={todo.id} todo={todo} toBe={false} socket={socket} />);

  return (
    <div className="TDlist row gy-5">
      {arrTodosToBe}
      {arrTodos}
    </div>
  );
}

export default TDlist;
