import { createSlice } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestion, saveQuestionAnswer } from "../../data";
import { addUserAnswer, addUserQuestion } from "./users.slice";

const sliceName = "questions";
const initialState = {};

export const questions = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      const question = action.payload;
      return { ...state, [question.id]: question };
    },
    addUserVoteToQuestion: (state, action) => {
      const { qid, answer, uid } = action.payload;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, uid],
          },
        },
      };
    },
    updateQuestion: (state, action) => {
      const question = action.payload;
      return { ...state, [question.id]: question };
    },
    receiveQuestions: (state, action) => {
      const questions = action.payload;
      return { ...state, ...questions };
    },
  },
});

export const {
  addQuestion,
  addUserVoteToQuestion,
  updateQuestion,
  receiveQuestions,
} = questions.actions;

export const selectQuestions = (state) => state.questions;

export const addQuestionAsync =
  ({ optionOneText, optionTwoText, author }, onSuccess, onError) =>
  async (dispatch, getState) => {
    dispatch(showLoading());

    try {
      const question = await saveQuestion({
        optionOneText,
        optionTwoText,
        author,
      });

      // Update locally
      dispatch(addQuestion(question));
      dispatch(addUserQuestion({ qid: question.id, uid: author }));

      if (onSuccess) onSuccess(question.id);
    } catch (e) {
      console.log("Fail addQuestionAsync()", e);
      if (onError) onError(e.message);
    }

    dispatch(hideLoading());
  };

export const saveQuestionAnswerAsync =
  ({ authedUser, qid, answer }, onSuccess, onError) =>
  async (dispatch, getState) => {
    dispatch(showLoading());

    try {
      await saveQuestionAnswer({ authedUser, qid, answer });

      console.log("saving qusetion");

      // Update locally
      dispatch(addUserAnswer({ answer, qid, uid: authedUser }));
      dispatch(addUserVoteToQuestion({ answer, qid, uid: authedUser }));

      if (onSuccess) onSuccess();
    } catch (e) {
      console.log("Fail saveQuestionAnswerAsync()", e);
      if (onError) onError(e.message);
    }

    dispatch(hideLoading());
  };

export default questions.reducer;
