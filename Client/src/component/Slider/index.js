/* import library */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

/* import foder */
import { getArray } from "../../ultils/fn";
import styles from "./Slider.module.scss";
import * as actions from "../../store/actions";

const Slider = () => {
  const { banner } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sliderImage = document.getElementsByClassName(styles.imageItem);
    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      const list = getArray(min, max, sliderImage.length - 1);
      for (let i = 0; i < sliderImage.length; i++) {
        list.some((item) => item === i)
          ? (sliderImage[i].style.display = "none")
          : (sliderImage[i].style.display = "block");
      }
      // list.forEach((item) => {
      //   if (item === max) {
      //     sliderImage[max].classList.add("slide-left");
      //   } else if (item === min) {
      //     sliderImage[min].classList.add("slide-right");
      //   } else {
      //     sliderImage[item].classList.add("slide-left");
      //   }
      // });
      // min = min === sliderImage.length - 1 ? 0 : min + 1;
      // max = max === sliderImage.length - 1 ? 0 : max + 1;
    }, 1000);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [banner]);

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setCurrentSongId(item.encodeId));
      dispatch(actions.playAlbum(false));
      dispatch(actions.playVideo(false));
    }
    if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
      dispatch(actions.playAlbum(true));
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.imageGroup)}>
        {banner.items?.map((item) => (
          <img
            key={item.encodeId}
            className={clsx(styles.imageItem)}
            src={item.banner}
            alt=""
            onClick={() => {
              handleClickBanner(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
