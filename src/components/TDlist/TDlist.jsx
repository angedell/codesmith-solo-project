import React from 'react';
import { useSelector } from 'react-redux';
import Todo from '../Todo/Todo.jsx';
import TodoToBe from '../TodoToBe/TodoToBe.jsx';

function TDlist({ s }) {
  const arrTodos = useSelector((state) => state.todo.todos);
  const arrTodosToBe = useSelector((state) => state.todo.todosToBe);

  const todos = arrTodos.map((todo) => (<Todo key={todo.id} todo={todo} s={s} />));

  const todosToBe = [];
  if (Array.isArray(arrTodosToBe)) {
    for (const i in arrTodosToBe) {
      if (arrTodosToBe[i].DeletedOn === undefined) {
        todosToBe.push(<TodoToBe key={arrTodosToBe[i].cookie} todo={arrTodosToBe[i]} s={s} />);
      }
    }
console.log(todosToBe);
  }
  return (
    <div className="TDlist row gy-5">
      {todos}
       {todosToBe}     
    </div>
  );
}

export default TDlist;
