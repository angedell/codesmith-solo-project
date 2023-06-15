import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import s from './socket.js';
import TDsend from './components/TDsend/TDsend.jsx';
import TDlist from './components/TDlist/TDlist.jsx';
import Header from './components/Header/Header.jsx';
import {
  addTodo, completeTodo, deleteTodo, editTodo, addTodoToBe, removeTodoToBe,
} from './store/todoSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    s.on('hello', (arr) => {
      arr.forEach((todo) => {
        dispatch(addTodo(todo));
      });
    });

    s.on('aTodoCreated', (data) => {
      console.log('AnewTodoCreated', data);
      dispatch(addTodo(data));
      dispatch(removeTodoToBe(data.cookie));
    });

    s.on('aTodoCompleted', (data) => {
      console.log('aTodoHasBeenCompleted', data);
      dispatch(completeTodo(data));
    });

    s.on('aTodoDeleted', (data) => {
      console.log('aTodoHasBeenDeleted', data);
      dispatch(deleteTodo(data));
    });

    s.on('aTodoUpdated', (data) => {
      console.log('aTodoHasBeenUpdated', data);
      dispatch(editTodo(data));
    });

    s.on('aTodoTyped', (data) => {
      console.log('aTodoHasBeenTyped', data);
      dispatch(addTodoToBe(data));
    });
  });

  return (
    <div id="container">
      <Header s={s} />
      <TDsend s={s} />
      <TDlist s={s} />
    </div>
  )
}

export default App;
