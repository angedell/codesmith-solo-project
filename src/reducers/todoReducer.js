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
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completedOn = new Date().toISOString();
      }
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    editTodo: (state, action) => {

    },
    deleteTodo: (state, action) => {

    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    addTodoToBe: (state, action) => {
      let found = false;
      state.todosToBe.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title;
          todo.author = action.payload.author;
          todo.CreatedOn = action.payload.CreatedOn;
          todo.CompletedOn = action.payload.CompletedOn;
          found = true;
        }
      });
      if (!found) {
        state.todosToBe.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      // console.log('fulfilled')
      state.todos = action.payload;
    }),
    builder.addCase(fetchTodos.rejected, (state, action) => {
      // console.log('rejected',action)
      state.error = action.payload;
    }),
    builder.addCase(fetchTodos.pending, (state, action) => {
      // console.log('pending')
      state.isLoading = true;
    });
  },
});

export const {
  addTodo, editTodo, deleteTodo, loadTodos, setAuthor, completeTodo, addTodoToBe,
} = todoSlice.actions;

export default todoSlice.reducer;
