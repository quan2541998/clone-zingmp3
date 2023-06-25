import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";
import { Navigate, useLocation } from "react-router-dom";
import * as apis from "../../../services";
import * as actions from "../../../store/actions";
import icons from "../../../ultils/icons";
import ListSongs from "../../../component/ListSongs";
import styles from "./Album.module.scss";
import { useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const Album = () => {
  const location = useLocation();

  console.log(location);
  // HOOK
  const { title, pid } = useParams();
  const dispatch = useDispatch();
  // Icon
  const { AiFillHeart, BsThreeDots, BsPlayFill } = icons;
  // State
  const [listAlbum, setListAlbum] = useState("");

  useEffect(() => {
    const fetchDetailPlayList = async () => {
      const res = await apis.getDetailPlayList(pid);

      if (res.data.err === 0) {
        const data = res.data.data;
        setListAlbum(data);
        dispatch(actions.listSong(data?.song?.items));
        dispatch(actions.setCurrentAlbumData(res.data.data));
      }
    };

    fetchDetailPlayList();
  }, [pid]);
  if (listAlbum === "") {
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
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.listAlbum)}>
          <div className={clsx(styles.infoArtist)}>
            <div className={clsx(styles.thumbnail)}>
              <img src={listAlbum?.thumbnail} alt="" />
            </div>
            <div className={clsx(styles.artistContent)}>
              <div className={clsx(styles.info)}>
                <h3 className={clsx(styles.title)}>{listAlbum?.title}</h3>
                <p className={clsx(styles.update)}>
                  <span>Cập nhật:</span>
                  <span>
                    {moment
                      .unix(listAlbum?.contentLastUpdate)
                      .format("DD/MM/YYYY")}
                  </span>
                </p>
                <p className={clsx(styles.listArtistName)}>
                  {listAlbum?.artists.map((item, index) =>
                    index < listAlbum.artists.length - 1 ? (
                      <span key={index}>{`${item.name} ,`}</span>
                    ) : (
                      <span key={index}>{`${item.name}`}</span>
                    )
                  )}
                </p>
                <p className={clsx(styles.totalLike)}>
                  {`${Math.round(listAlbum?.like / 1000)}K người yêu thích`}
                </p>
              </div>
              <div className={clsx(styles.action)}>
                <button>
                  <BsPlayFill />
                  <span>PHÁT NGẪU NHIÊN</span>
                </button>
                <div className={clsx(styles.config)}>
                  <div>
                    <AiFillHeart />
                  </div>
                  <div>
                    <BsThreeDots />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(styles.listSong)}>
            <div className={clsx(styles.description)}>
              <span>Lời tựa</span>
              <span>{listAlbum?.sortDescription}</span>
            </div>
            <ListSongs
              songs={listAlbum?.song.items}
              totalDuration={listAlbum?.song.totalDuration}
              totalSong={listAlbum?.song.total}
            />
          </div>
        </div>
        <div className={styles.suggestArtist}>
          <div className={styles.participatingArtists}></div>
          <div className={styles.favouriteArtists}></div>
        </div>
      </div>
    );
  }
};

export default Album;
