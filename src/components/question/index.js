import React, { useState } from "react";
import { connect } from "react-redux";
import { formatDate } from "../../utility";
import ImagePlaceHolder from "../imagePlaceHolder";

function Question(props) {
  const { children, author, question } = props;
  const [imgError, setImgError] = useState(false);

  if (!author) return null;

  const { name, avatarURL } = author;
  const { timestamp } = question;

  const onImgError = () => setImgError(true);

  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: "100%" }}>
      <div className="card-header fw-bold text-center">{name} asks...</div>
      <div className="row g-0">
        <div className="col-md-4 m-auto text-center">
          {imgError ? (
            <ImagePlaceHolder />
          ) : (
            <img
              src={avatarURL}
              className="img-fluid rounded-start"
              alt={name}
              onError={onImgError}
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body h-100">
            {children && React.cloneElement(children, { ...props })}
          </div>
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">{formatDate(timestamp)}</small>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser, questions, users }, { id }) => ({
  authedUser: authedUser && users[authedUser],
  author: questions[id] && users[questions[id].author],
  question: questions[id],
});

export default connect(mapStateToProps)(Question);
