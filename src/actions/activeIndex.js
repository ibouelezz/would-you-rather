export const SET_ACTIVE_INDEX = "SET_ACTIVE_INDEX";

export function setActiveIndex(index) {
  return {
    type: SET_ACTIVE_INDEX,
    index,
  };
}
