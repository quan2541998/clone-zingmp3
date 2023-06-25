import React, { memo } from "react";
import styles from "./SongItem.module.scss";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import clsx from "clsx";
import icons from "../../ultils/icons";

const SongItem = ({
  className,
  data,
  order,
  percent,
  handleMouseOver,
  handleMouseOut,
  isPlayListCurrent,
  isBlurText,
}) => {
  const { domPage, domRightSideBar, positionMouse } = useSelector(
    (state) => state.controlDOM
  );
  const dispatch = useDispatch();
  const { AiOutlineHeart } = icons;

  const handlePlayVideo = (e) => {
    dispatch(actions.setCurrentSongId(data.encodeId));
    dispatch(actions.playVideo(false));

    const isChildInPage = domPage.contains(e.target);
    const isChildInRightSideBar = domRightSideBar.contains(e.target);
    if (isChildInPage && positionMouse !== "page") {
      dispatch(actions.setPostionMouse("page"));
    }
    if (isChildInRightSideBar && positionMouse !== "rightSideBar") {
      dispatch(actions.setPostionMouse("rightSideBar"));
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div
        className={clsx(styles.songItem, className ? styles[className] : "", {
          [styles.active]: isPlayListCurrent,
          [styles.nonActive]: isBlurText,
        })}
        onClick={handlePlayVideo}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className={styles.mediaLeft}>
          {order && <span className={styles.order}>{order}</span>}
          <div className={styles.songThumb}>
            <img src={data?.thumbnailM} alt="" />
          </div>
          <div className={styles.infoSong}>
            <h1 className={styles.title}>
              {data?.title?.length > 28
                ? `${data?.title?.slice(0, 28)}...`
                : data?.title}
            </h1>
            <span className={styles.artistsNames}>{data?.artistsNames}</span>
            <span className={styles.releaseDate}>
              {moment(data?.releaseDate * 1000).fromNow()}
            </span>
          </div>
        </div>
        {percent && (
          <div className={styles.percent}>{<span>{`${percent}%`}</span>}</div>
        )}
      </div>
      {isPlayListCurrent && (
        <div className={styles.nextSong}>
          <h3 className={styles.title}>Tiếp theo</h3>
          <h3 className={styles.subtitle}>
            <span>Từ playlist</span>
            <span>V-Poem</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default memo(SongItem);
