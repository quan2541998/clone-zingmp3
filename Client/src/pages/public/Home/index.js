import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./Home.module.scss";
import Slider from "../../../component/Slider";
import Section from "../../../component/Section";
import WeekRank from "../../../component/WeekRank";
import NewRelease from "../../../component/NewRelease";
import ChartSection from "../../../component/ChartSection";
import clsx from "clsx";
import { TailSpin } from "react-loader-spinner";

const Home = () => {
  const { blackValentine, chill, power, artist, weekChart } = useSelector(
    (state) => state.home
  );
  if (blackValentine && chill && power && artist && weekChart) {
    return (
      <div className="loadingContainer">
        <div className="loadingWrapper">
          <TailSpin
            height="60"
            width="60"
            color="var(--color-dark)"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.slider}>
          <Slider />
        </div>
        <div className={styles.section}>
          <NewRelease />
          <Section data={blackValentine} />
          <Section data={chill} />
          <Section data={power} />
          <Section data={artist} />
          <ChartSection />
          <WeekRank data={weekChart} />
        </div>
      </div>
    );
  }
};

export default Home;
