import actionTypes from "./actionTypes";

export const setDOMPage = (data) => {
  return {
    type: actionTypes.SET_DOM_PAGE,
    payload: data,
  };
};

export const setDOMRightSideBar = (data) => {
  return {
    type: actionTypes.SET_DOM_RIGHT_SIDE_BAR,
    payload: data,
  };
};

export const setPostionMouse = (data) => {
  return {
    type: actionTypes.SET_POSTION_MOUSE,
    payload: data,
  };
};
