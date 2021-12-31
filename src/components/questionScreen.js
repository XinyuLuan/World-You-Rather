import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Error from "./error";
import Question from "./question/index";
import Results from "./question/results";
import Vote from "./question/vote";

function QuestionScreen({ id, hasQuestion, hasVoted }) {
  if (!hasQuestion) return <Error text="No question found"></Error>;

  return <Question id={id}>{hasVoted ? <Results /> : <Vote />}</Question>;
}

const matchStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.match.params;

  let hasVoted = false;

  if (authedUser && users && users[authedUser]) {
    const { answers } = users[authedUser];

    if (answers && id in answers) {
      hasVoted = true;
    }
  }

  return {
    id,
    hasQuestion: questions[id] ? true : false,
    hasVoted,
  };
};

export default withRouter(connect(matchStateToProps)(QuestionScreen));
