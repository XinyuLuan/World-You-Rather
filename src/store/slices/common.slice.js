import { createSlice } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "react-redux-loading";
import { fetchQuestionsAndUsers } from "../../data";
import { receiveQuestions } from "./questions.slice";
import { receiveUsers } from "./users.slice";
import { setLoading } from "./loading.slice";

const sliceName = "common";
const initialState = {
  showQuestionType: "UNANSWERED",
};

export const common = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setShowQuestionType: (state, action) => {
      const showQuestionType = action.payload;
      return { ...state, showQuestionType };
    },
  },
});

export const { setShowQuestionType } = common.actions;

export const selectUsernames = (state) => state.common;

export const fetchDataAsync = (amount) => async (dispatch, getState) => {
  dispatch(showLoading());
  const { questions, users } = await fetchQuestionsAndUsers();
  dispatch(receiveUsers(users));
  dispatch(receiveQuestions(questions));
  dispatch(setLoading(false));
  dispatch(hideLoading());
};

export default common.reducer;
