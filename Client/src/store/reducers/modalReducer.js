import actionTypes from "../actions/actionTypes";
const initState = {
  isVisbleChangeTheme: false,
  isVisbleAuth: false,
};

const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL_CHANGE_THEMES:
      return { ...state, isVisbleChangeTheme: action.payload };
    case actionTypes.SET_MODAL_AUTH:
      return { ...state, isVisbleAuth: action.payload };
    default:
      return state;
  }
};

export default modalReducer;
