import React from "react";
import clsx from "clsx";
import styles from "./Sticker.module.scss";

const Sticker = ({ message, value, background, backgroundBtn }) => {
  return (
    <div
      className={clsx(styles.sticker, {
        [styles.purpleBg]: background === "purple",
        [styles.linearBg]: background === "linear",
      })}
    >
      <div className={clsx(styles.text)}>{message}</div>
      <button
        className={clsx(styles.btn, {
          [styles.transparentBtn]: backgroundBtn === "transparent",
          [styles.yellowBtn]: backgroundBtn === "yellow",
        })}
      >
        {value}
      </button>
    </div>
  );
};

export default Sticker;
