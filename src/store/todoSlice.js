import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todo: (state, action) => {
      console.log('DISPATCH');
      state.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { todo } = todoSlice.actions;

export default todoSlice.reducer;
