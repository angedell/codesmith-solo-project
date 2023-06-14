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
      const newTodo = {
        title: todo,
        author,
      };
      console.log(newTodo);
      fetch('/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      setTodo('');
    }
  }

  return (
    <div className="TDsend">
      <div className="m-3 sendUnit">
        <Label for="todoTitle" className="form-label">your todo</Label>
        <Input onChange={todoTyping} type="text" className="form-control" id="todoTitle" placeholder="your todo" value={todo} />
      </div>
      <div className="m-3 sendUnit">
        <Button color="success" onClick={send}>Send</Button>
      </div>
    </div>

  );
}

export default TDsend;
