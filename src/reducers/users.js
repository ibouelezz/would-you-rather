import {
  RECEIVE_USERS,
  USER_ANSWERED_QUESTION,
  USER_ADDED_QUESTION,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case USER_ANSWERED_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    case USER_ADDED_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: [...state[action.authedUser].questions, action.qid],
        },
      };
    default:
      return state;
  }
}
