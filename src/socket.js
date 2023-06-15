import { io } from 'socket.io-client';

const socket = io();

socket.on('connect', () => {
  console.log('connected');
});


// socket.on('todoTyping', (msg) => {
//   console.log(msg);
// });

export default socket;
