import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload]
    },
  },
});

export const { setMessages, addMessage } = slice.actions;

export default slice.reducer;