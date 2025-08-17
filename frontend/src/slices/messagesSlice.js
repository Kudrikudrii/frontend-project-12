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
    removeMessages: (state, { payload }) => {
      state.messages = state.messages.filter(m => m.channelId !== payload.id);
    },

  },
});

export const { setMessages, addMessage, removeMessages } = slice.actions;

export default slice.reducer;