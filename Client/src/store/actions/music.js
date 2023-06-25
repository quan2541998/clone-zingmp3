import actionTypes from "./actionTypes";
import * as apis from "../../services/index.js";

export const setCurrentSongId = (id) => {
  return {
    type: actionTypes.SET_CURRENT_SONG_ID,
    payload: id,
  };
};

export const playVideo = (flag) => {
  return {
    type: actionTypes.SET_PLAY_AUDIO,
    payload: flag,
  };
};

export const listSong = (data) => {
  return {
    type: actionTypes.SET_LIST_SONG,
    payload: data,
  };
};

export const playAlbum = (flag) => {
  return {
    type: actionTypes.SET_ALBUM,
    payload: flag,
  };
};

export const setCurrentSongData = (data) => {
  return {
    type: actionTypes.SET_CURRENT_SONG_DATA,
    payload: data,
  };
};

export const setCurrentAlbumData = (data) => {
  return {
    type: actionTypes.SET_CURRENT_ALBUM_DATA,
    payload: data,
  };
};

export const setPlayListData = (data) => {
  return {
    type: actionTypes.SET_PLAYLIST_DATA,
    payload: data,
  };
};

export const setRecenlyData = (data) => {
  return {
    type: actionTypes.SET_RECENLY_DATA,
    payload: data,
  };
};
