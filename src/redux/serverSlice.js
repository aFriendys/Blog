/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const serverSlice = createSlice({
  name: 'serverSlice',
  initialState: { articlesCount: 0, offset: 0, isAuthorized: false, user: {} },
  reducers: {
    setPagesCount(state, action) {
      state.articlesCount = action.payload;
    },
    setOffset(state, action) {
      state.offset = action.payload;
    },
    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload;
    },
    setUserData(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setPagesCount, setOffset, setIsAuthorized, setUserData } = serverSlice.actions;
export default serverSlice.reducer;
