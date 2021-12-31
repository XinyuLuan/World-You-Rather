import React, { useState } from "react";
import { connect } from "react-redux";
import ImagePlaceHolder from "./imagePlaceHolder";

function User(props) {
  const { user, answerCount, questionCount, scoreCount, index } = props;
  const [imgError, setImgError] = useState(false);

  if (!user) return null;

  const { name, avatarURL } = user;

  const scoreStyle = {};

  switch (index) {
    case 0:
      scoreStyle.backgroundColor = "gold";
      scoreStyle.borderColor = "goldenrod";
      scoreStyle.color = "darkgoldenrod";
      break;

    case 1:
      scoreStyle.backgroundColor = "silver";
      scoreStyle.borderColor = "gray";
      scoreStyle.color = "gray";
      break;

    case 2:
      scoreStyle.backgroundColor = "sandybrown";
      scoreStyle.borderColor = "peru";
      scoreStyle.color = "sienna";
      break;

    default:
  }

  const onError = () => setImgError(true);

  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: "100%" }}>
      <div className="row g-0">
        <div className="col-md-4 m-auto text-center">
          {!imgError ? (
            <img
              alt={name}
              className="img-fluid rounded-start"
              onError={onError}
              src={avatarURL}
            />
          ) : (
            <ImagePlaceHolder />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body h-100">
            <div className="score-leaderboard-container h-100">
              <div className="score-leaderboard-name text-center">{name}</div>
              <div className="score-leaderboard-score text-center">Score</div>
              <div className="score-leaderboard-counts h-100">
                <div className="score-count-container h-100">
                  <div className="score-answer-count-label">
                    Answered Questions
                  </div>
                  <div className="score-answer-count">{answerCount}</div>
                  <div className="score-question-count-label">
                    Created Questions
                  </div>
                  <div className="score-question-count">{questionCount}</div>
                </div>
              </div>
              <div className="score-leaderboard-total text-center">
                <div className="score-circle m-2" style={scoreStyle}>
                  {scoreCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ users }, props) => ({
  user: users[props.id],
});

export default connect(mapStateToProps)(User);
