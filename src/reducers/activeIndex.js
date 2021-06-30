import { SET_ACTIVE_INDEX } from "../actions/activeIndex";

export default function activeIndex(state = "home", action) {
  switch (action.type) {
    case SET_ACTIVE_INDEX:
      return action.index;
    default:
      return state;
  }
}
