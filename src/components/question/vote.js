import React, { useState } from "react";
import { connect } from "react-redux";
import { saveQuestionAnswerAsync } from "../../store/slices/questions.slice";

const options = ["optionOne", "optionTwo"];

function Vote(props) {
  const { authedUser, dispatch, question } = props;
  const [error, setError] = useState(null);
  const [radio, setRadio] = useState(options[0]);

  const onChange = (value) => setRadio(value);

  const onSubmit = (e) => {
    e.preventDefault();

    const onError = (e) => setError("Error. Try again.");

    const voteInfo = {
      authedUser: authedUser.id,
      qid: question.id,
      answer: radio,
    };

    console.log({ voteInfo });

    dispatch(saveQuestionAnswerAsync(voteInfo, undefined, onError));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <h5 className="card-title text-center">Would you rather...</h5>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div className="text-center text-danger">{error}</div>
        {options.map((option) => (
          <div className="form-check" key={option}>
            <input
              checked={radio === option}
              className="form-check-input"
              name={option}
              id={option}
              onChange={(e) => onChange(e.target.value)}
              type="radio"
              value={option}
            />
            <label className="form-check-label card-text" htmlFor={option}>
              {question[option].text}
            </label>
          </div>
        ))}
        <div>
          <button className="btn btn-outline-primary w-100" type="submit">
            Vote
          </button>
        </div>
      </form>
    </div>
  );
}

export default connect()(Vote);
