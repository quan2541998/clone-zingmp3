import axiosClient from "./apiConfig";

const authApi = {
  register: async (data) => {
    try {
      const url = "/register";
      const response = await axiosClient.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (data) => {
    try {
      const url = "/login";
      const response = await axiosClient.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authApi;
