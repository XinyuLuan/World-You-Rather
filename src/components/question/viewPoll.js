import React from "react";
import { withRouter } from "react-router";

function ViewPoll({ history, question }) {
  const { optionOne, optionTwo } = question;

  const onClick = (e, id) => {
    e.preventDefault();

    history.push(`/questions/${id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h5 className="card-title text-center">Would you rather...</h5>
      <div className="card-text text-center">
        <div>{optionOne.text}</div>

        <div className="m-3">or</div>

        <div>{optionTwo.text}</div>
      </div>
      <div className="d-grid gap-2">
        <button
          className="btn btn-outline-primary"
          onClick={(e) => onClick(e, question.id)}
          type="button"
        >
          View Poll
        </button>
      </div>
    </div>
  );
}

export default withRouter(ViewPoll);
