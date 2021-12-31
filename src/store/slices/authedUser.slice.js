import { createSlice } from "@reduxjs/toolkit";

const sliceName = "authedUser";
const initialState = null;

export const authedUser = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setAuthedUser: (state, action) => {
      const authedUser = action.payload;
      return authedUser;
    },
  },
});

export const { setAuthedUser } = authedUser.actions;

export const selectAuthedUser = (state) => state.authedUser;

export default authedUser.reducer;
