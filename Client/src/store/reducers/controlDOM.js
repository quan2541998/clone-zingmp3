import actionTypes from "../actions/actionTypes";

const initState = {
  domPage: null,
  domRightSideBar: null,
  positionMouse: null,
};

const controlDOMReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_DOM_PAGE:
      return {
        ...state,
        domPage: action.payload || null,
      };

    case actionTypes.SET_DOM_RIGHT_SIDE_BAR:
      return {
        ...state,
        domRightSideBar: action.payload || null,
      };
    case actionTypes.SET_POSTION_MOUSE:
      return {
        ...state,
        positionMouse: action.payload || null,
      };

    default:
      return state;
  }
};

export default controlDOMReducer;
