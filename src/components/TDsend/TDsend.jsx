import React, { useState } from 'react';
import { Button, Label, Input } from 'reactstrap';


function TDsend() {
  const [todo, setTodo] = useState('');


  function todoTyping(e) {

    return setTodo(e.target.value);
  }

  function send() {

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
