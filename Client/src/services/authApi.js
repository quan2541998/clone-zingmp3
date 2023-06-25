import axiosClient from "./apiConfig";

const authApi = {
  register: async (data) => {
    try {
      const url = "http://localhost:3001/api/v1/register";
      const response = await axiosClient.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (data) => {
    try {
      const url = "http://localhost:3001/api/v1/login";
      const response = await axiosClient.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authApi;
