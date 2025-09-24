import { createSlice } from '@reduxjs/toolkit';
import leoProfanity from 'leo-profanity';

const initialState = {
  channels: [], // { id: '1', name: 'general', removable: false}
};

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    addChannel: (state, { payload }) => {
      const filteredChannel = {
        ...payload,
        name: leoProfanity.clean(payload.name),
      };
      state.channels.push(filteredChannel); // { id: '3', name: 'new name channel', removable: true }
    },
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find((c) => c.id === payload.id);
      if (channel) channel.name = payload.name;
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((c) => c.id !== payload.id);
    },
  },
});

export const { setChannels, addChannel, renameChannel, removeChannel } =
  slice.actions;

export default slice.reducer;
