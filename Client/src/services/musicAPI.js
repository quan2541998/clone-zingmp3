import axios from "axios";
import { listSong } from "../store/actions";

export const getSong = async (sid) => {
  let res;
  try {
    res = await axios({
      url: "https://api-zingmp3-vercel.vercel.app/api/song",
      method: "get",
      params: { id: sid },
    });
  } catch (error) {
    return error;
  }
  return res;
};

export const getDetailSong = async (sid) => {
  let res;
  try {
    res = await axios({
      method: "get",
      url: "https://api-zingmp3-vercel.vercel.app/api/infosong",
      params: {
        id: sid,
      },
    });
  } catch (error) {
    return error;
  }
  return res;
};

export const getDetailPlayList = async (pid) => {
  let res;
  try {
    res = await axios({
      url: "https://api-zingmp3-vercel.vercel.app/api/detailplaylist",

      method: "get",
      params: { id: pid },
    });
  } catch (error) {
    return error;
  }
  return res;
};

export const getSearchSong = async (keyword) => {
  let res;
  try {
    res = await axios({
      url: "https://api-zingmp3-vercel.vercel.app/api/search",
      method: "get",
      params: { keyword },
    });
  } catch (error) {
    return error;
  }
  return res;
};
