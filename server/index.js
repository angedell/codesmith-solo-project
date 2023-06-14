const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');
const todoRouter = require('./router/todo');

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle events from the client
  socket.on('todoTyping', (msg) => {
    console.log('Received message:', msg);
    // Broadcast the message to all connected clients
    io.emit('TodoToBe', msg);
  });

  socket.on('hello', (msg) => {
    console.log('Received message:', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use('/todo', todoRouter);

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
  console.log('listening on *:3000');
});
