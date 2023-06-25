import React, { useEffect } from "react";
import favoriteSongApi from "../../../services/favoriteSongAPI";
const MyMusic = () => {
  const { get } = favoriteSongApi;

  useEffect(() => {
    get();
  }, []);

  return <div>MyMusic</div>;
};

export default MyMusic;
