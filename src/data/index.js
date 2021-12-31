import {
  _fetchUsernames,
  _getUsers,
  _getQuestions,
  _saveUser,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./data";

export function fetchQuestionsAndUsers() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function fetchUsernames() {
  return _fetchUsernames();
}

export function saveUser(user) {
  return _saveUser(user);
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer(info);
}
