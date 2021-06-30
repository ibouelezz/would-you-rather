import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestionAnswer } from "../utils/api";
import { userAnsweredQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(answerQuestion({ authedUser, qid, answer }));
      dispatch(userAnsweredQuestion({ authedUser, qid, answer }));
      dispatch(hideLoading());
    });
  };
}
