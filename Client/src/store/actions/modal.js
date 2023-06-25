import actionTypes from "./actionTypes";

export const modalAuthAction = (payload) => {
  return {
    type: actionTypes.SET_MODAL_AUTH,
    payload,
  };
};

export const modalChangeThemesAction = (payload) => {
  return {
    type: actionTypes.SET_MODAL_CHANGE_THEMES,
    payload,
  };
};
