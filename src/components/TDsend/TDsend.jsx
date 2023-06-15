import React, { useState, useEffect } from 'react';
import { Button, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../store/todoSlice';

function TDsend({ s }) {
  const [todo, setTodo] = useState('');
  const author = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  function todoTyping(e) {
    s.emit('ItypingTodo', { title: e.target.value, author });
    return setTodo(e.target.value);
  }

  function send() {
    const sendtodo = {
      id: `${Date.now()}`,
      title: todo,
      author,
      CreatedOn: new Date().toISOString(),
    };
    dispatch(addTodo(sendtodo));
    s.emit('IcreateTodo', { sendtodo });
    setTodo('');
  }

  return (
    <div className="TDsend">
      <div className="m-3 sendUnit">
        <Input onChange={todoTyping} type="text" className="form-control" id="todoTitle" placeholder="what does need to be done?" value={todo} />
      </div>
      <div className="m-3 sendUnit">
        <Button color="success" onClick={send}>Create</Button>
      </div>
    </div>

  );
}

export default TDsend;
