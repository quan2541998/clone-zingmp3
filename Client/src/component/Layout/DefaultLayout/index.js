import clsx from "clsx";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./NavBar";
import PlayList from "./PlayList";
import PlayerControls from "./PlayerControls";
import styles from "./DefaultLayout.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions";
import { Scrollbars } from "react-custom-scrollbars-2";

const DefaultLayout = () => {
  const pageRef = useRef(null);
  const dispatch = useDispatch();

  const changeDataSearch = (data) => {
    setDataSearch(data);
  };

  useEffect(() => {
    dispatch(actions.setDOMPage(pageRef.current));
  }, []);
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.navbar)}>
          <Navbar />
        </div>
        <div className={clsx(styles.content)}>
          <div className={clsx(styles.header)}>
            <Header onDataChange={changeDataSearch} />
          </div>
          <Scrollbars
            style={{ width: "100%", height: "calc(100vh - 160px)" }}
            renderThumbVertical={() => <div style={{ display: "none" }} />}
          >
            <div ref={pageRef} className={clsx(styles.mainpage)}>
              <Outlet></Outlet>
            </div>
          </Scrollbars>
        </div>
        <div className={clsx(styles.playlist)}>
          <PlayList />
        </div>
      </div>
      <div className={clsx(styles.playerControls)}>
        <PlayerControls />
      </div>
    </div>
  );
};

export default DefaultLayout;
