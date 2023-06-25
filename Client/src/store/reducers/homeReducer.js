import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  blackValentine: [],
  chill: [],
  power: [],
  artist: [],
  newRelease: {},
  weekChart: [],
  chart: {},
  ranks: [],
};

const homeReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_BANNER:
      return {
        ...state,
        banner:
          action.payload?.find((item) => item.sectionId === "hSlider") || null,
        blackValentine: action.payload?.find(
          (item) => item.sectionId === "hSeasonTheme" || null
        ),
        chill: action.payload.find(
          (item) => item.sectionId === "hEditorTheme" || null
        ),
        power: action.payload.find(
          (item) => item.sectionId === "hEditorTheme2" || null
        ),
        artist: action.payload.find(
          (item) => item.sectionId === "hArtistTheme" || null
        ),
        newRelease:
          {
            ...action.payload.find(
              (item) => item.sectionType === "new-release"
            ),
          } || {},
        weekChart:
          [
            ...action.payload.find((item) => item.sectionType === "weekChart")
              ?.items,
          ] || {},
        chart:
          {
            ...action.payload.find((item) => item.sectionId === "hZC")?.chart,
          } || {},
        ranks:
          [...action.payload.find((item) => item.sectionId === "hZC")?.items] ||
          [],
      };
    default:
      return state;
  }
};

export default homeReducer;
