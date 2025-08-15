import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const slice = createSlice({
  name: '',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const { setMessages } = slice.actions;

export default slice.reducer;