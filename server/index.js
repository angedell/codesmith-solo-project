const express = require('express');

const app = express();
// const cors = require('cors')
const http = require('http');
const { Server } = require('socket.io');
// require("dotenv").config();
// app.use(cors());
const server = http.createServer(app);
const { PrismaClient } = require('@prisma/client');

const io = new Server(server, {
  // cors: {
  //   origin: process.env.WEB_APP_ENDPOINT,
  //   methods: ["GET", "POST"],
  // },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.send('Welcome to chat backend service!');
});

io.on('connection', (socket) => {
  console.log('connected', socket.id);
  socket.on('chat', (data) => {
    console.log(data);
    io.emit('chat', data);
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
