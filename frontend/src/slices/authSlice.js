import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { username, token } }) => {
      state.username = username
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer
