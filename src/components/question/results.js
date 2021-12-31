import React from "react";
import { connect } from "react-redux";
import Result from "./result";

function getResults(questionId, users) {
  const votes = {
    optionOne: 0,
    optionTwo: 0,
  };

  for (const uid in users) {
    const { answers } = users[uid];

    if (answers && questionId in answers) {
      votes[answers[questionId]]++;
    }
  }
  const totalVotes = votes.optionOne + votes.optionTwo;

  return {
    ...votes,
    totalVotes,
  };
}

function Results({ authedUser, id, question, users }) {
  const { optionOne, optionTwo } = question;
  const results = getResults(id, users);

  return (
    <>
      <h5 className="card-title mb-3 text-center">Results</h5>
      <Result
        text={optionOne.text}
        totalVotes={results.totalVotes}
        voted={authedUser.answers[id] === "optionOne"}
        votes={results.optionOne}
      />
      <div className="mb-3"></div>
      <Result
        text={optionTwo.text}
        totalVotes={results.totalVotes}
        voted={authedUser.answers[id] === "optionTwo"}
        votes={results.optionTwo}
      />
    </>
  );
}

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Results);
