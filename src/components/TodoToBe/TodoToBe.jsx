import React, { useEffect } from 'react';
import {
  Card, CardBody, CardSubtitle,CardTitle,
} from 'reactstrap';

function TodoToBe({ todo, s }) {

console.log('TodoToBe', todo);


  return (
    <div>
      <Card className="todoItem">
        <CardBody>
          <div className="d-flex justify-content-between">
            <div>
              <CardTitle tag="h5">{todo.title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">
                being modified by
                {' '}
                {todo.author}
              </CardSubtitle>
            </div>
            <div>
              {/* <CardText>being modified by {todo.author}</CardText> */}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TodoToBe;
