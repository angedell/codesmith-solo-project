import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  author: '',
  isLoading: false,
  error: null,
  todos: [],
  todosToBe: [],
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchContent',
  async () => {
    const res = await axios.get('/todo');
    const data = await res.data;
    return data;
  },
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    completeTodo: (state, action) => {
      // console.log(state )
      const todo = state.todos.find((todo) => todo.id === action.payload);
      console.log(todo);
      if (todo) {
        todo.CompletedOn = new Date().toISOString();
      }
    },
    addTodo: (state, action) => {
      state.todos.push({...action.payload, CompletedOn: null});
    },



    editTodo: (state, action) => {
      console.log(action);
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      todo.title = action.payload.title;
      todo.CompletedOn = null;
      console.log(action);
    },
    deleteTodo: (state, action) => {
      console.log(action);
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.DeletedOn = new Date().toISOString();
      }
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },

    // removeTodoToBe

    removeTodoToBe: (state, action) => {
      console.log(action);
      const todo = state.todosToBe.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.DeletedOn = new Date().toISOString();
      }
    },

    addTodoToBe: (state, action) => {

      let found = false;
      state.todosToBe.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title;
          todo.author = action.payload.author;
          found = true;
        }
      });
      if (!found) {
        state.todosToBe.push({
          id: action.payload.id,
          title: action.payload.title,
          author: action.payload.author,
          cookie: action.payload.cookie,});
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      console.log('fulfilled');
      state.todos = action.payload;
    }),
    builder.addCase(fetchTodos.rejected, (state, action) => {
      console.log('rejected', action);
      state.error = action.payload;
    }),
    builder.addCase(fetchTodos.pending, (state, action) => {
      console.log('pending');
      state.isLoading = true;
    });
  },
});

export const {
  addTodo, editTodo, deleteTodo, setAuthor, completeTodo, addTodoToBe, removeTodoToBe,
} = todoSlice.actions;

export default todoSlice.reducer;
