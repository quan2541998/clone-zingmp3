import actionTypes from "./actionTypes";
import * as apis from "../../services/index.js";

export const setChangeTheme =
  (typePath, actionsType, info) => async (dispath) => {
    try {
      const res = await apis.readThemesJson(typePath);
      console.log(res);
      dispath({
        type: actionsType,
        payload: {
          info: { ...info },
          dataCss: { ...res },
        },
      });
    } catch (error) {
      dispath({
        type: actionsType,
        payload: {
          info: "",
          dataCss: null,
        },
      });
    }
  };
