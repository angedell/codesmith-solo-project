import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, CardSubtitle, CardImg, CardText, CardTitle,
} from 'reactstrap';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { useDispatch } from 'react-redux';
import checkmark from '../../assets/checkmark.svg';
import edit from '../../assets/edit.svg';
import deleteBin from '../../assets/deleteBin.svg';
import { completeTodo, editTodo, deleteTodo } from '../../reducers/todoReducer';

function Todo(props) {
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const {
    title, author, CreatedOn, CompletedOn, id,
  } = props.todo;
  const { toBe, socket } = props;

  useEffect(() => {
    if (CompletedOn !== null) {
      console.log('completedOn ', CompletedOn);
      setCompleted(true);
    }
  }, []);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  const formattedDate = timeAgo.format(new Date(CreatedOn), 'twitter');

  const subtitleTest = toBe ? `not yet committed by ${author}` : `${formattedDate} by ${author}`;
  const placeholderClass = toBe ? 'prov' : '';
  const completedClass = CompletedOn || completed ? 'completed' : '';

  function handleClick(action) {
    // console.log(action);
    if (action === 'complete') {
      socket.emit('todoCompleted', { id });
      setCompleted(true);
    }
    if (action === 'edit') {
      dispatch(editTodo(id));
    }
    if (action === 'delete') {
      dispatch(deleteTodo(id));
    }
  }

  const buttons = [];
  if (!toBe) {
    buttons.push(<CardImg onClick={() => handleClick('complete')} className="icon" src={checkmark} height="30px" alt="mark completed" />);
    buttons.push(<CardImg onClick={() => handleClick('edit')} className="icon" src={edit} height="30px" alt="edit" />);
    buttons.push(<CardImg onClick={() => handleClick('delete')} className="icon" src={deleteBin} height="30px" alt="delete" />);
  }

  return (

    <Card className={`todoItem ${placeholderClass} ${completedClass}`}>
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            <CardTitle tag="h5">{title}</CardTitle>
            <CardSubtitle className="mb-2 text-muted">{subtitleTest}</CardSubtitle>
          </div>
          <div>
            <div style={{ display: 'flex' }}>
              {buttons}
            </div>
            <CardText>{CompletedOn}</CardText>
          </div>
        </div>
      </CardBody>
    </Card>

  );
}

export default Todo;
