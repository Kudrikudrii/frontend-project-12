import { createSlice } from '@reduxjs/toolkit';
import leoProfanity from 'leo-profanity';

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
      const filteredMessage = {
        ...payload,
        body: leoProfanity.clean(payload.body)
      };
      state.messages.push(filteredMessage);
    },
    removeMessages: (state, { payload }) => {
      state.messages = state.messages.filter(m => m.channelId !== payload.id);
    },

  },
});

export const { setMessages, addMessage, removeMessages } = slice.actions;

export default slice.reducer;