import React, { memo } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = ({
  className,
  style,
  isActive,
  handleClick,
  text,
  children,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        className ? clsx(styles[className]) : clsx(styles.defaultBtn),
        {
          [styles.active]: isActive,
        }
      )}
      style={style}
      onClick={handleClick}
    >
      {text}
      {children}
    </button>
  );
};

export default memo(Button);
