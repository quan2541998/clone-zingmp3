import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import styles from "./Search.module.scss";
import { Link } from "react-router-dom";
const Search = () => {
  const navbarSearch = [
    {
      id: 1,
      content: "tất cả",
      link: "/tim-kiem/tat-ca",
      isActive: true,
    },
    {
      id: 2,
      content: "bài hát",
      link: "/tim-kiem/song",
      isActive: false,
    },
    {
      id: 3,
      content: "playlist/album",
      link: "",
      isActive: false,
    },
    {
      id: 4,
      content: "nghệ sĩ/OA",
      link: "",
      isActive: false,
    },
  ];

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.navbarSearch)}>
        <h1 className={clsx(styles.title)}>Kết quả tìm kiếm</h1>
        <ul className={clsx(styles.navMenu)}>
          {navbarSearch.map((item, index) => {
            return (
              <Link key={index} to={item.link}>
                <li
                  className={clsx(styles.navItem, {
                    [styles.isActive]: item.isActive,
                  })}
                >
                  {item.content}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Search;
