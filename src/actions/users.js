export const RECEIVE_USERS = "RECEIVE_USERS";
export const USER_ANSWERED_QUESTION = "USER_ANSWERED_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function userAnsweredQuestion({ authedUser, qid, answer }) {
  return {
    type: USER_ANSWERED_QUESTION,
    authedUser,
    qid,
    answer,
  };
}
