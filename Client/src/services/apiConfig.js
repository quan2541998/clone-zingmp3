import axios from "axios";
import { getToken } from "../ultils/localStorage";
import openAuth from "../ultils/openAuth";

const UNAUTHORIZED = 401;
const TOKEN_EXPIRED = 403;
const BAD_REQUEST = 400;

const token = getToken();


const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_ZINGMP3}`,
  timeout: 50 * 1000,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    if (config.url && config.url.indexOf("http") < 0) {
      config.url = config.baseURL + config.url;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      throw new Error("canceled");
    } else if (error.response && error.response.code === "ECONNABORTED") {
      throw new Error("overtime");
    } else if (error.response?.status === TOKEN_EXPIRED) {
      openAuth();
    }
    throw error;
  }
);

export default axiosClient;
