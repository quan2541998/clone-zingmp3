import actionTypes from "../actions/actionTypes";

const initState = {
  info: {
    title: "xanh biển",
    linkImg:
      "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue-light.jpg",
  },

  dataCss: {
    "--color-primary": "#3B68EF",
    "--color-second": "#6D798A",
    "--color-three": "#2E4058",
    "--color-four": "#203D65",
    "--color-dark": "#32323D",

    "--layout-bg": "#162A45",
    "--layout-header": "#162A45",
    "--layout-navbar": "#21344E",
    "--layout-playlist": "#162A45",
    "--layout-playcontrol": "#172F4F",
    "--color-line": "#2E4058",

    "--color-textWhenBtnActive": "#FFFFFF",
    "--bg-navActive": "#EEDADA",

    "--color-text-normal": "#ffffff",
    "--color-text-nav": "#dadada",
    "--color-durationbar": "#5D6D84",

    "--bg-box-item": "#203D65",
  },
};

const themesReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANGE_THEME_PINK:
      return {
        ...state,
        info: action.payload.info,
        dataCss: action.payload.dataCss || null,
      };
    case actionTypes.SET_CHANGE_THEME_BLUE:
      return {
        ...state,
        info: action.payload.info,
        dataCss: action.payload.dataCss || null,
      };

    default:
      return state;
  }
};

export default themesReducer;
