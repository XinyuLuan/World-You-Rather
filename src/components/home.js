import React from "react";
import { connect } from "react-redux";
import { setShowQuestionType } from "../store/slices/common.slice";
import HomeTab from "./homeTab";
import Question from "./question";
import ViewPoll from "./question/viewPoll";

export const ANSWERED = "ANSWERED";
export const UNANSWERED = "UNANSWERED";

const tabs = [
  {
    title: "Unanswered Questions",
    value: UNANSWERED,
  },
  {
    title: "Answered Questions",
    value: ANSWERED,
  },
];

function Home({ answered, unanswered, dispatch, showQuestionType }) {
  let showQuestions = [];
  switch (showQuestionType) {
    case UNANSWERED:
      showQuestions = unanswered;
      break;
    case ANSWERED:
      showQuestions = answered;
      break;
    default:
      showQuestions = [];
  }

  const onTabChange = (answerType) => dispatch(setShowQuestionType(answerType));

  return (
    <div className="card">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs nav-fill">
          {tabs.map((tab) => (
            <HomeTab
              currentValue={showQuestionType}
              key={tab.value}
              onTabChange={onTabChange}
              title={tab.title}
              value={tab.value}
            />
          ))}
        </ul>
      </div>
      <div className="card-body">
        {showQuestions.length > 0 ? (
          showQuestions.map((question) => (
            <Question key={question} id={question}>
              <ViewPoll />
            </Question>
          ))
        ) : (
          <div className="text-center">
            Zero {showQuestionType.toLowerCase()} questions.
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser, questions, common, users }) => {
  const { showQuestionType } = common;

  let answered = [];
  let unanswered = [];

  if (authedUser && users[authedUser] && Object.keys(questions).length > 0) {
    const { answers } = users[authedUser];
    if (answers) {
      answered = Object.keys(answers).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
      );

      unanswered = Object.keys(questions)
        .filter((q) => !(q in answers))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
    }
  }

  return {
    authedUser,
    answered,
    showQuestionType,
    unanswered,
  };
};

export default connect(mapStateToProps)(Home);
