import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ThemesSection.module.scss";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import actionTypes from "../../store/actions/actionTypes";
import icons from "../../ultils/icons";
import useModalActions from "../../hook/useModalActions";

const ThemesSection = () => {
  const { handleModalThemes } = useModalActions();

  let portalRoot = document.getElementById("portal-root");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.id = "portal-root";
    document.body.appendChild(portalRoot);
  }
  useEffect(() => {
    return () => {
      if (portalRoot && portalRoot.parentNode === document.body) {
        document.body.removeChild(portalRoot);
      }
    };
  }, []);

  const { AiOutlineCloseCircle } = icons;
  const dispatch = useDispatch();

  const handleChangeThemes = (typePath, typeDispath, info) => {
    dispatch(actions.setChangeTheme(typePath, typeDispath, info));
  };

  const optionColor = [
    {
      id: uuidv4(),
      title: "Màu sắc",
      data: [
        {
          id: uuidv4(),
          title: "hồng cánh sen",
          img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink-light.jpg",
          typePath: "themePink",
          typeDispath: actionTypes.SET_CHANGE_THEME_PINK,
        },
        {
          id: uuidv4(),
          title: "xanh biển",
          img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue-light.jpg",
          typePath: "themeBlue",
          typeDispath: actionTypes.SET_CHANGE_THEME_BLUE,
        },
      ],
    },
  ];

  return createPortal(
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.bgOpacity)} onClick={handleModalThemes}></div>
      <div className={clsx(styles.option)}>
        <div className={styles.header}>
          <h1 className={clsx(styles.title)}>Giao diện</h1>
          <button className={clsx(styles.closeBtn)} onClick={handleModalThemes}>
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className={clsx(styles.content)}>
          {optionColor.map((item) => {
            return (
              <div className={clsx(styles.section)}>
                <h1 className={clsx(styles.titleSection)} key={item.id}>
                  {item.title}
                </h1>
                <div className={clsx(styles.columnWrapper)}>
                  {item.data.map((dataInfo) => {
                    return (
                      <div
                        className={clsx(styles.columnItem)}
                        onClick={() => {
                          handleChangeThemes(
                            dataInfo.typePath,
                            dataInfo.typeDispath,
                            {
                              title: dataInfo.title,
                              linkImg: dataInfo.img,
                            }
                          );
                        }}
                      >
                        <div className={clsx(styles.thumbnail)}>
                          <img src={dataInfo.img} alt="" />
                        </div>
                        <h1 className={clsx(styles.des)}>{dataInfo.title}</h1>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>,

    portalRoot
  );
};

export default ThemesSection;
