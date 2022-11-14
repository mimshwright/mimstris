export const REPLACE_STATE = "REPLACE_STATE";
export const replaceState = (state) => ({
  type: REPLACE_STATE,
  payload: state,
});
