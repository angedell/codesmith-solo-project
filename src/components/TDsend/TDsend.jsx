import React, { useState, useEffect } from 'react';
import { Button, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

function TDsend({ socket }) {
  const [todo, setTodo] = useState('');
  const author = useSelector((state) => state.todos.author);

  function todoTyping(e) {
    socket.emit('todoTyping', {
      title: e.target.value, author, id: socket.id, CreatedOn: new Date().toISOString(),
    });
    return setTodo(e.target.value);
  }

  function send() {
    if (todo !== '') {
      socket.emit('newTodo', {title: todo, author, id: socket.id, CreatedOn: new Date().toISOString()});
      setTodo('');
    }
  }

  return (
    <div className="TDsend">
      <div className="m-3 sendUnit">
        <Input onChange={todoTyping} type="text" className="form-control" id="todoTitle" placeholder="what does need to be done?" value={todo} />
      </div>
      <div className="m-3 sendUnit">
        <Button color="success" onClick={send}>Send</Button>
      </div>
    </div>

  );
}

export default TDsend;
