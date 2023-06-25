import React from "react";
import clsx from "clsx";
import styles from "./ArtistSection.module.scss";
import Button from "../Button";
import { handleNumber } from "../../ultils/fn";
const ArtistSection = ({ data, className }) => {
  return (
    <div className={clsx(styles.wrapper, className ? className : "")}>
      <div className={clsx(styles.thumbnail)}>
        <img src={data.thumbnail} alt="" />
      </div>
      <div className={styles.subtitle}>
        <h1 className={styles.title}>{data.title || data.name}</h1>
        <p className={styles.totalFollow}>{`${handleNumber(
          data.totalFollow
        )} quan tâm`}</p>
      </div>
      <div className={styles.btn}>
        <button>Quan tâm</button>
      </div>
    </div>
  );
};

export default ArtistSection;
