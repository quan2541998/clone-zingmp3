import axios from "axios";

export const readThemesJson = async (typePath) => {
  let res;

  try {
    res = await axios({
      url: `/mutilThemes/${typePath}/${typePath}.json`,
      method: "get",
    });
  } catch (error) {
    return error;
  }

  return res.data;
};
