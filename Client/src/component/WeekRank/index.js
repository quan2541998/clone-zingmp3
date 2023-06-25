import React from "react";
import styles from "./WeekRank.module.scss";
import { Link } from "react-router-dom";

const WeekRank = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.wrapper}>
      {data?.map((item, index) => (
        <Link to={item.link.split(".")[0]} key={index} className={styles.card}>
          <img src={item.cover} alt={item.cover} />
        </Link>
      ))}
    </div>
  );
};

export default WeekRank;
