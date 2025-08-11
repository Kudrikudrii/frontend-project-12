import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
  },
});

export const { setChannels } = slice.actions;

export default slice.reducer;
