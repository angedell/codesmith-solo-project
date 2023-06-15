const express = require('express');
const session = require('express-session');

const sessionMiddleware = session({
  secret: 'Yyhf$Rj?G?ERbHGx5sBRdTANDS6hrY',
  resave: false,
  saveUninitialized: false,
});

const app = express();
// const cors = require('cors')
const http = require('http');
const { Server } = require('socket.io');
// require("dotenv").config();
// app.use(cors());
const server = http.createServer(app);
const { PrismaClient } = require('@prisma/client');

const io = new Server(server, {
  cookie: true,
});


const todoRouter = require('./router/todo');


io.engine.use(sessionMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.use('/todo', todoRouter);

io.on('connection', async (socket) => {
  const socketId = socket.id;
  // console.log('connected', socketId);

  try {
    const existingTodos = await prisma.todo.findMany({
      where: {
        DeletedOn: null,
      },
      orderBy: {
        CreatedOn: 'asc',
      },
    });
    socket.emit('hello', existingTodos);
  } catch (err) {
    console.log(err);
  }

  socket.on('ItypingTodo', (data) => {
    const cookie = socket.handshake.headers.cookie;
    socket.broadcast.emit('aTodoTyped', {...data, cookie});
  });

  socket.on('IcreateTodo', async (data) => {
    const cookie = socket.handshake.headers.cookie;
    const { title, author } = data.sendtodo;
    try {
      const todoEnt = await prisma.todo.create({
        data: {
          title,
          author,
        },
      });

      socket.broadcast.emit('aTodoCreated', {...todoEnt, cookie});
    } catch (err) {
      socket.emit('createError', 'got an error trying to create your todo');
    }
  });

  socket.on('IcompleteTodo', async (data) => {
    if (data) {
      const todoUpdate = await prisma.todo.update({
        where: {
          id: data,
        },
        data: {
          CompletedOn: new Date(),
        },
      });
      socket.broadcast.emit('aTodoCompleted', data);
      console.log('aTodoCompleted', todoUpdate);
    }
  });

  socket.on('IdeleteTodo', async (data) => {
    if (data) {
      const todoDelete = await prisma.todo.update({
        where: {
          id: data,
        },
        data: {
          DeletedOn: new Date(),
        },
      });
      socket.broadcast.emit('aTodoDeleted', data);

      console.log('deleteTodo', data);
    }
  });

  socket.on('IupdateTodo', async (data) => {
    if (data.decomplete) {
      const todoDelete = await prisma.todo.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          CompletedOn: null,
        },
      });
    } else {
      const todoDelete = await prisma.todo.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
        },
      });
    }

    console.log('IupdateTodo', data);
    socket.broadcast.emit('aTodoUpdated', data);
  });

  socket.on('newUsername', (data) => {
    console.log('newUsername', data);
  });
});

app.use((req, res) => res.status(404).send("This is not the page you're looking for..."));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  // console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(3000, () => {
  console.log('Server is running');
});

// const express = require('express');

// const app = express();
// const http = require('http');

// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const todoRouter = require('./router/todo');

// const io = new Server(server);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle events from the client
//   socket.on('todoTyping', (msg) => {
//     console.log('Received message:', msg);
//     // Broadcast the message to all connected clients
//     io.emit('TodoToBe', msg);
//   });

//   socket.on('todoCompleted', async (msg) => {
//     // Broadcast the message to all connected clients

//     const todo = await prisma.todo.update({
//       where: {
//         id: msg.id,
//       },
//       data: {
//         CompletedOn: new Date(),
//       },
//     });
//   });

//   socket.on('newTodo', async (msg) => {
//     const { title, author } = msg;
//     // console.log(title)
//     const todoEnt = await prisma.todo.create({
//       data: {
//         title,
//         author,
//       },
//     });
//     // todoEnt.save();
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// app.use('/todo', todoRouter);

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });
