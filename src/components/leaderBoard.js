import React from "react";
import { connect } from "react-redux";
import Title from "./title";
import User from "./user";

function LeaderBoard({ sortedUsers }) {
  return (
    <div>
      <Title>Leader Board</Title>
      {sortedUsers.map((user, index) => (
        <User key={user.id} {...user} index={index} />
      ))}
    </div>
  );
}

const mapStateToProps = ({ users }) => {
  const computedUsers = [];

  for (const id in users) {
    const { answers } = users[id];
    const answerCount = Object.keys(answers).length;
    const questionCount = users[id].questions.length;
    const scoreCount = answerCount + questionCount;

    computedUsers.push({
      answerCount,
      id,
      questionCount,
      scoreCount,
    });
  }

  return {
    sortedUsers: computedUsers.sort((a, b) => b.scoreCount - a.scoreCount),
  };
};

export default connect(mapStateToProps)(LeaderBoard);
