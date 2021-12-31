import { createSlice } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "react-redux-loading";
import { saveUser } from "../../data";
import { formatUser } from "../../utility";

const sliceName = "users";
const initialState = {};

export const users = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      if (!(user.uid in state)) state = { ...state, [user.uid]: user };
      return state;
    },
    addUserAnswer: (state, action) => {
      const { uid, qid, answer } = action.payload;
      return {
        ...state,
        [uid]: {
          ...state[uid],
          answers: {
            ...state[uid].answers,
            [qid]: answer,
          },
        },
      };
    },
    addUserQuestion: (state, action) => {
      const { uid, qid } = action.payload;
      return {
        ...state,
        [uid]: {
          ...state[uid],
          questions: [...state[uid].questions, qid],
        },
      };
    },
    updateUser: (state, action) => {
      const user = action.payload;
      return { ...state, [user.id]: user };
    },
    receiveUsers: (state, action) => {
      const users = action.payload;
      return users;
    },
  },
});

export const {
  addUser,
  addUserAnswer,
  addUserQuestion,
  updateUser,
  receiveUsers,
} = users.actions;

export const selectUsers = (state) => state.users;

export const addUserAsync =
  (info, onSuccess, onError) => async (dispatch, getState) => {
    dispatch(showLoading());

    try {
      const user = await saveUser(formatUser(info));
      if (onSuccess) onSuccess(user);
    } catch (e) {
      console.log("Fail handleAddUser()", e);
      if (onError) onError(e.message);
    }

    dispatch(hideLoading());
  };

export default users.reducer;
