import homeReducer from "./homeReducer";
import musicReducer from "./musicReducer";
import controlDOMReducer from "./controlDOM";
import themesReducer from "./themesReducer";
import modalReducer from "./modalReducer";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

const commomConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const musicConfig = {
  ...commomConfig,
  key: "music",
  whitelist: [
    "currentSongId",
    "listSongs",
    "currentSongData",
    "currentAlbumData",
    "playListData",
    "recenlyData",
  ],
};

const domConfig = {
  ...commomConfig,
  key: "dom",
  whitelist: ["positionMouse"],
};

const themesConfig = {
  ...commomConfig,
  key: "theme",
  whitelist: ["info", "dataCss"],
};

const rootReducer = combineReducers({
  home: homeReducer,
  themes: persistReducer(themesConfig, themesReducer),
  music: persistReducer(musicConfig, musicReducer),
  controlDOM: persistReducer(domConfig, controlDOMReducer),
  modal: modalReducer,
});

export default rootReducer;
