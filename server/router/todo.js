const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo } = require('../controller/todoController');


router.get('/', 
  getAllTodos,
  (req, res) => {
    console.log("someone is asking for all posts!")
    if (res.locals.todos) {
      res.status(200).json(res.locals.todos);
    } else {
      const err = {
        log: 'no todos were found',
        status: 400,
        message: { err: 'no todos were found' },
      };
      return next(err);
    }
})

router.post('/',
  createTodo, 
  (req, res) => {
    
    if (res.locals.todo) {
    res.status(201).json(res.locals.todo);
    } else {
    const err = {
        log: 'no todo was created',
        status: 400,
        message: { err: 'no todo was created' },
    };
    return next(err);
    }
})
  


module.exports = router;