import actionTypes from "../actions/actionTypes";

const initState = {
  currentSongId: null,
  isPlayAudioFirst: true,
  listSongs: [],
  isAlbum: true,
  currentSongData: null,
  currentAlbumData: null,
  playListData: null,
  recenlyData: [],
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG_ID:
      return {
        ...state,
        currentSongId: action.payload || null,
      };
    case actionTypes.SET_PLAY_AUDIO:
      return {
        ...state,
        isPlayAudioFirst: action.payload,
      };
    case actionTypes.SET_LIST_SONG:
      return {
        ...state,
        listSongs: action.payload,
      };

    case actionTypes.SET_ALBUM:
      return {
        ...state,
        isAlbum: action.payload,
      };

    case actionTypes.SET_CURRENT_SONG_DATA:
      return {
        ...state,
        currentSongData: action.payload || null,
      };

    case actionTypes.SET_CURRENT_ALBUM_DATA:
      return {
        ...state,
        currentAlbumData: action.payload || null,
      };
    case actionTypes.SET_PLAYLIST_DATA:
      return {
        ...state,
        playListData: action.payload || null,
      };
    case actionTypes.SET_RECENLY_DATA:
      if (state.recenlyData.length > 5) {
        state.recenlyData.pop();
      }
      if (
        !state.recenlyData.some(
          (item) => item.encodeId === action.payload.encodeId
        )
      ) {
        return {
          ...state,
          recenlyData: [action.payload, ...state.recenlyData] || [],
        };
      } else {
        const targetSong = state.recenlyData.find(
          (item) => item.encodeId === action.payload.encodeId
        );
        const newDataFitter = state.recenlyData.filter(
          (item) => item.encodeId !== targetSong.encodeId
        );
        return {
          ...state,
          recenlyData: [targetSong, ...newDataFitter],
        };
      }

    default:
      return state;
  }
};

export default musicReducer;
