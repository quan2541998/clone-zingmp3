import React, { memo } from "react";
import clsx from "clsx";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

import styles from "./ListSongItem.module.scss";
import icons from "../../ultils/icons";

const ListSongItem = ({ songData }) => {
  const { FiMusic } = icons;
  const dispatch = useDispatch();

  return (
    <div className={clsx(styles.wrapper)}>
      <div
        className={clsx(styles.listSongItem)}
        onClick={() => {
          dispatch(actions.setCurrentSongId(songData?.encodeId));
          dispatch(actions.playVideo(false));
        }}
      >
        <div className={clsx(styles.info)}>
          <span>
            <FiMusic />
          </span>
          <div className={clsx(styles.thumbnail)}>
            <img src={songData?.thumbnail} alt="" />
          </div>
          <div className={clsx(styles.content)}>
            <h3 className={clsx(styles.title)}>
              {songData?.title?.length > 30
                ? `${songData?.title?.slice(0, 30)}...`
                : songData?.title}
            </h3>
            <h5 className={clsx(styles.artistsNames)}>
              {songData?.artistsNames?.length > 30
                ? `${songData?.artistsNames?.slice(0, 30)}...`
                : songData?.artistsNames}
            </h5>
          </div>
        </div>
        <div className={clsx(styles.album)}>
          <span>{songData?.album?.title}</span>
        </div>
        <div className={clsx(styles.time)}>
          <span>{moment.utc(songData?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ListSongItem);
