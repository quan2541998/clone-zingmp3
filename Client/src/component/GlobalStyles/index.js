import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import "./GlobalStyles.scss";

const GlobalStyles = ({ children }) => {
  const { linkAssets, dataCss } = useSelector((state) => state.themes);
  console.log(linkAssets);
  console.log(dataCss);

  useEffect(() => {
    for (let key in dataCss) {
      document.documentElement.style.setProperty(key, dataCss[key]);
    }
  }, [dataCss]);

  return <div className="globalStyles">{children}</div>;
};

export default GlobalStyles;
