import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Button";
import SongItem from "../SongItem";
import styles from "./NewRelease.module.scss";

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.home);
  const [buttonTab, setButtonTab] = useState([
    {
      text: "tất cả",
      typeApi: "all",
      className: "btnRelease",
      isActive: true,
    },
    {
      text: "việt nam",
      typeApi: "vPop",
      className: "btnRelease",
      isActive: false,
    },
    {
      text: "quốc tế",
      typeApi: "others",
      className: "btnRelease",
      isActive: false,
    },
  ]);
  const [dataRelease, setDataRelease] = useState([]);

  useEffect(() => {
    setDataRelease(newRelease?.items?.all?.slice(0, 12));
  }, [newRelease]);

  const handleChangeTab = (typeApi) => {
    const newButtonTab = buttonTab.map((item) => {
      if (item.typeApi === typeApi) {
        setDataRelease(newRelease?.items?.[typeApi]?.slice(0, 12));
        return {
          ...item,
          isActive: true,
        };
      } else {
        return {
          ...item,
          isActive: false,
        };
      }
    });

    setButtonTab(newButtonTab);
  };
  return (
    <div className={styles.wrapper}>
      <h1>Mới Phát Hành</h1>
      <div className={styles.select}>
        <div className={styles.buttons}>
          {buttonTab.map((item, index) => (
            <Button
              key={index}
              text={item.text}
              isActive={item.isActive}
              className={item.className}
              handleClick={() => {
                handleChangeTab(item.typeApi);
              }}
            />
          ))}
        </div>
        <div>Tất cả</div>
      </div>
      <div className={styles.songs}>
        {dataRelease?.map((item) => (
          <SongItem
            key={item.encodeId}
            data={item}
            className={"newReleaseSong"}
          />
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
