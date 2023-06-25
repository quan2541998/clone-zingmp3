import axios from "axios";

export const getHome = async () => {
  let res;

  const serverUrl = process.env.REACT_APP_SERVER_ZINGMP3;

  console.log(serverUrl);
  try {
    res = await axios({
      url: "https://api-zingmp3-vercel.vercel.app/api/home",
      method: "get",
    });
  } catch (error) {
    return error;
  }
  return res;
};
