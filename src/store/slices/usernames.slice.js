import { createSlice } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "react-redux-loading";
import { fetchUsernames } from "../../data";

const sliceName = "usernames";
const initialState = [];

export const usernames = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setUsernames: (state, action) => {
      const usernames = action.payload;
      return usernames;
    },
  },
});

export const { setUsernames } = usernames.actions;

export const selectUsernames = (state) => state.usernames;

export const getUsernamesAsync = (amount) => async (dispatch, getState) => {
  dispatch(showLoading());
  const usernames = await fetchUsernames();
  dispatch(setUsernames(usernames));
  dispatch(hideLoading());
};

export default usernames.reducer;
