export const SET_LAST_ROUTE = "SET_LAST_ROUTE";

export function setLastRoute(route) {
  return {
    type: SET_LAST_ROUTE,
    route,
  };
}
