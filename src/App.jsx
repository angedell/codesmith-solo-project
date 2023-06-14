import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import TDsend from './components/TDsend/TDsend.jsx';
import TDlist from './components/TDlist/TDlist.jsx';
import { fetchTodos, addTodoToBe } from './reducers/todoReducer.js';
import Header from './components/Header/Header.jsx';

const socket = io();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('TodoToBe', (todosToBe) => {
      if (socket.id !== todosToBe.id) {
        dispatch(addTodoToBe(todosToBe));
      }
    });
    dispatch(fetchTodos());
  }, []);

  return (
    <div id="container">
      <Header />
      <TDsend socket={socket} />
      <TDlist socket={socket} />
    </div>

  );
}

// export {socket};
export default App;
