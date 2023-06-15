const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const todoController = {
  getAllTodos: async (req, res, next) => {
    const todos = await prisma.todo.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    // console.log(todos);
    res.locals.todos = todos;
    return next();
  },

  createTodo: async (req, res, next) => {
    const { title, author } = req.body;
    // console.log(title)
    const todoEnt = await prisma.todo.create({
      data: {
        title,
        author,
      },
    });
    res.locals.todo = todoEnt;
    console.log(todoEnt);
    return next();
  },

  deleteTodo: async (req, res, next) => {
    const { id } = req.params;
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    res.json(todo);
    return next();
  },

  updateTodo: async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return next();
  },
};

module.exports = todoController;
