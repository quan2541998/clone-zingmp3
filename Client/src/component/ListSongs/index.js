import React from "react";
import clsx from "clsx";
import styles from "./ListSongs.module.scss";

import icons from "../../ultils/icons";
import moment from "moment";
import ListSongItem from "../ListSongItem";

const ListSongs = ({ songs, totalDuration }) => {
  const { BsDot } = icons;
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.title)}>
        <div className={clsx(styles.titleLeft)}>
          <span>Bài hát</span>
        </div>
        <div className={clsx(styles.titleCenter)}>
          <span>Album</span>
        </div>
        <div className={clsx(styles.titleRight)}>
          <span>Thời gian</span>
        </div>
      </div>
      <div className={clsx(styles.listSong)}>
        {songs?.map((item) => (
          <ListSongItem key={item.encodeId} songData={item} />
        ))}
      </div>
      <div className={clsx(styles.infoListSong)}>
        <span>{`${songs?.length} bài hát`}</span>
        <span>
          <BsDot size={20} />
        </span>
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")} </span>
      </div>
    </div>
  );
};

export default ListSongs;
