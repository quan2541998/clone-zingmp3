import axiosClient from "./apiConfig";

const favoriteSongApi = {
  get: () => {
    const url = "http://localhost:3001/api/v1/private/mymusic";
    return axiosClient.get(url);
  },
  post: (data) => {
    const url = "http://localhost:3001/api/v1/private/mymusic";
    return axiosClient.post(url, data);
  },
};

export default favoriteSongApi;
