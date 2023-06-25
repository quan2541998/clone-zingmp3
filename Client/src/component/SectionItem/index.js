import React from "react";
import clsx from "clsx";
import styles from "./SectionItem.module.scss";
import { Link } from "react-router-dom";
import icons from "../../ultils/icons";
const SectionItem = ({ data, className }) => {
  const { BsPlayFill } = icons;
  return (
    <div className={clsx(styles.wrapper, className ? className : "")}>
      <div className={clsx(styles.thumbnail)}>
        <img src={data.thumbnail} alt="" />
        <div className={clsx(styles.bg)}></div>
        <div className={clsx(styles.actions)}>
          <div className={clsx(styles.playBtn)}>
            <BsPlayFill />
          </div>
        </div>
      </div>
      <div className={clsx(styles.info)}>
        <h3 className={clsx(styles.infoTitle)}>
          {data?.title?.length > 30
            ? `${data?.title?.slice(0, 30)}...`
            : data.title}
        </h3>
        <div className={clsx(styles.infoArtistName)}>
          {data?.artists?.slice(0, 5).map((artist, index) => {
            return (
              <Link
                key={artist.id}
                to={artist.link}
                className={clsx(styles.artistNameItem)}
              >
                <span>
                  {index === data.artists.length - 1 &&
                  data?.artists?.length === 1
                    ? `${artist.name}`
                    : index === 4
                    ? `${artist.name}... `
                    : `${artist.name}, `}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionItem;
