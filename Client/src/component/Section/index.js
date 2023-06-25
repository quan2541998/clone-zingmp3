import React, { memo } from "react";
import styles from "./Section.module.scss";
import clsx from "clsx";

const Section = ({ data }) => {
  if (!Array.isArray(data) && typeof data !== "undefined") {
    data.total = "Tất cả";

    return (
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.title)}>
          <h1 className={clsx(styles.titleLeft)}>{data?.title}</h1>
          <span className={clsx(styles.titleRight)}>Tất cả</span>
        </div>
        <div className={clsx(styles.content)}>
          {data?.items?.slice(0, 5).map((item) => (
            <div className={clsx(styles.cardImage)} key={item.encodeId}>
              <img src={item.thumbnailM} alt={item.title} />
              <p className={clsx(styles.cardImageDes)}>
                {`${item.sortDescription.slice(0, 40)} ...`}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    <></>;
  }
};

export default memo(Section);
