import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading";

import authedUser from "./slices/authedUser.slice";
import common from "./slices/common.slice";
import questions from "./slices/questions.slice";
import loading from "./slices/loading.slice";
import users from "./slices/users.slice";
import usernames from "./slices/usernames.slice";

export const store = configureStore({
  reducer: {
    authedUser,
    common,
    loading,
    loadingBar: loadingBarReducer,
    questions,
    users,
    usernames,
  },
});
