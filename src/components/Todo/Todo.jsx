import {
  Card, CardBody, CardSubtitle, CardImg, CardText, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import checkmark from '../../assets/checkmark.svg';
import edit from '../../assets/edit.svg';
import deleteBin from '../../assets/deleteBin.svg';
import { editTodo } from '../../store/todoSlice.js';

function Todo({ todo, s }) {
  const [completedcss, setCompletedcss] = React.useState('');
  const [visible, setVisible] = React.useState('');
  const [todoTitle, setTodoTitle] = React.useState(todo.title);
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo.DeletedOn) {
      setVisible(' deleted');
    }
  });

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  const formattedDate = timeAgo.format(new Date(todo.CreatedOn));

  const subtitleText = `${todo.author ? todo.author : 'Anonymous'} ${formattedDate}`;

  let CompletedOn;
  let completedOnClass;



  if (todo.CompletedOn !== null) {
    completedOnClass = ' completed';
  }

  const handleClick = (type) => {
    if (type === 'delete') {
      s.emit('IdeleteTodo', todo.id);
      setVisible(' deleted');
    }
    if (type === 'complete') {
      s.emit('IcompleteTodo', todo.id);
      setCompletedcss(' completed');
    }
    if (type === 'edit') {
      toggle();
    }
  };

  const updateSave = () => {
    s.emit('IupdateTodo', { id: todo.id, title: todoTitle, decomplete: true });
    dispatch(editTodo({ id: todo.id, title: todoTitle, decomplete: true }));
    toggle();
  };

  const buttons = [];
  buttons.push(<CardImg onClick={() => handleClick('complete')} className="icon" src={checkmark} height="30px" alt="mark completed" />);
  buttons.push(<CardImg onClick={() => handleClick('edit')} className="icon" src={edit} height="30px" alt="edit" />);
  buttons.push(<CardImg onClick={() => handleClick('delete')} className="icon" src={deleteBin} height="30px" alt="delete" />);

  return (
    <div className={visible}>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <input type="text" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateSave}>
            save
          </Button>
          {' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Card className="todoItem">
        <CardBody className={completedOnClass || completedcss}>
          <div className="d-flex justify-content-between">
            <div>
              <CardTitle tag="h5">{todo.title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">{subtitleText}</CardSubtitle>
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
    </div>
  );
}

export default Todo;
