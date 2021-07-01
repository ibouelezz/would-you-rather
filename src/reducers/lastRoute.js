import { SET_LAST_ROUTE } from "../actions/lastRoute";

export default function lastRoute(state = null, action) {
  switch (action.type) {
    case SET_LAST_ROUTE:
      return action.route;
    default:
      return state;
  }
}
