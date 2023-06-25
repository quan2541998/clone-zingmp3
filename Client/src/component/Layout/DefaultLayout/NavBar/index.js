import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";
import Sticker from "../../../Sticker";
import { Scrollbars } from "react-custom-scrollbars-2";
import { getToken } from "../../../../ultils/localStorage";
import openAuth from "../../../../ultils/openAuth";
import { useNavigate } from "react-router-dom";

import {
  FaMusic,
  FaChartBar,
  FaPlusCircle,
  FaCheckCircle,
  FaTwitter,
  FaSketch,
  FaSafari,
  FaReact,
  FaRenren,
} from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();

  const listNavBar = [
    {
      value: "Cá Nhân",
      path: "/my-music",
      icon: <FaMusic />,
      handleClick: (data) => {
        const isLoggedIn = getToken();
        if (!isLoggedIn) {
          openAuth();
        } else {
          navigate(data);
        }
      },
    },
    {
      value: "Khám Phá",
      path: "/",
      icon: <FaPlusCircle />,
      handleClick: (data) => {
        navigate(data);
      },
    },
    {
      value: "#zingchart",
      path: "/zing-chart",
      icon: <FaChartBar />,
      handleClick: (data) => {
        navigate(data);
      },
    },
    {
      value: "Radio",
      path: "/radio",
      icon: <FaCheckCircle />,
      handleClick: (data) => {
        navigate(data);
      },
    },
    {
      value: "Theo dõi",
      path: "/follow",
      icon: <FaTwitter />,
      handleClick: (data) => {
        navigate(data);
      },
    },
  ];

  const listNavSong = [
    {
      value: "Nhạc mới",
      icon: <FaSketch />,
    },
    {
      value: "Thể loại",
      icon: <FaSafari />,
    },
    {
      value: "Top 100",
      icon: <FaReact />,
    },
    {
      value: "MV",
      icon: <FaRenren />,
    },
  ];

  const sticker = [
    {
      message: "Đăng nhập để khám phá playlist dành riêng cho bạn",
      value: "NÂNG CẤP VIP",
      background: "linear",
      backgroundBtn: "yellow",
    },
  ];

  return (
    <aside className={clsx(styles.navbar)}>
      <div className={clsx(styles.logo)}>
        <div className={clsx(styles.logo__item)}></div>
      </div>
      <ul className={clsx(styles.menu)}>
        {listNavBar.map((item, index) => (
          <li key={index}>
            <div
              onClick={() => {
                item.handleClick(item.path);
              }}
              className={clsx(styles.navItem)}
            >
              <span>{item.icon}</span>
              <span>{item.value}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className={clsx(styles.divide)}></div>

      <Scrollbars style={{ flex: 1 }} autoHide>
        <div className={clsx(styles.list)}>
          <ul>
            {listNavSong.map((item, index) => (
              <li key={index}>
                <NavLink>
                  {item.icon}
                  <span>{item.value}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          {sticker.map((item, index) => (
            <div key={index} className={clsx(styles.sticker)}>
              <Sticker
                background={item.background}
                backgroundBtn={item.backgroundBtn}
                message={item.message}
                value={item.value}
              />
            </div>
          ))}
        </div>
      </Scrollbars>
    </aside>
  );
};

export default NavBar;
