import React, { useState } from "react";
import { connect } from "react-redux";
import { addQuestionAsync } from "../store/slices/questions.slice";
import { setShowQuestionType } from "../store/slices/common.slice";
import { UNANSWERED } from "./home";
import { withRouter } from "react-router-dom";
import Title from "./title";

function NewQuestion({ authedUser, dispatch, history }) {
  const [error, setError] = useState(null);
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const onError = (e) => setError("Error");

    const onSuccess = (qId) => {
      dispatch(setShowQuestionType(UNANSWERED));
      history.push(`/`);
    };

    if (authedUser) {
      const questionInfo = {
        optionOneText: optionOne.trim(),
        optionTwoText: optionTwo.trim(),
        author: authedUser,
      };

      dispatch(addQuestionAsync(questionInfo, onSuccess, onError));
    } else {
      setError("Authorized user does not exist");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Title>New Question</Title>
      <div className="text-center text-danger">{error}</div>
      <h5 className="card-title mt-1 text-center">Would you rather...</h5>
      <div className="mt-5 mb-3 text-center">
        <label className="form-label" htmlFor="optionOne">
          Option One
        </label>
        <input
          className="form-control"
          id="optionOne"
          onChange={(e) => setOptionOne(e.target.value)}
          required
          type="text"
          value={optionOne}
        />
      </div>
      <div className="mt-5 mb-3 text-center">
        <label className="form-label" htmlFor="optionTwo">
          Option Two
        </label>
        <input
          className="form-control"
          id="optionTwo"
          onChange={(e) => setOptionTwo(e.target.value)}
          required
          type="text"
          value={optionTwo}
        />
      </div>
      <div className="d-grid gap-2 mt-5">
        <button className="btn btn-primary" type="submit">
          Ask New Question
        </button>
      </div>
    </form>
  );
}

const matchStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default withRouter(connect(matchStateToProps)(NewQuestion));
