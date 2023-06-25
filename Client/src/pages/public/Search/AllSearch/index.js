import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import styles from "./AllSearch.module.scss";
import { handleNumber } from "../../../../ultils/fn";
import SongItem from "../../../../component/SongItem";
import { Link } from "react-router-dom";
import * as actions from "../../../../store/actions";
import ArtistSection from "../../../../component/ArtistSection";
import SectionItem from "../../../../component/SectionItem";
import { useSearchParams } from "react-router-dom";
import * as apis from "../../../../services";
import { TailSpin } from "react-loader-spinner";
const AllSearch = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState("");
  const valueParams = searchParams.get("q");
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await apis.getSearchSong(valueParams);
        if (res.data.err === 0) {
          setSearchData(res.data.data);
          console.log(res.data.data);
        }
      } catch (error) {
        return error;
      }
    };

    fetchApi();
  }, [valueParams]);

  const handleCLickSong = (data) => {
    dispatch(actions.setCurrentSongId(data.encodeId));
    dispatch(actions.playVideo(false));
  };
  if (searchData === "") {
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
        <div className={clsx(styles.outStandingSection)}>
          <h1 className={clsx(styles.title)}>Nổi bật</h1>
          <div className={clsx(styles.carouselWrapper)}>
            {searchData?.top && (
              <div className={clsx(styles.media)}>
                <div className={clsx(styles.mediaLeft)}>
                  <img src={searchData.top.thumbnail} alt="" />
                </div>
                <div className={clsx(styles.mediaRight)}>
                  <p className={clsx(styles.type)}>
                    {searchData.top.objectType === "artist" ? "Nghệ sĩ" : ""}
                  </p>
                  <p className={clsx(styles.title)}>
                    {" "}
                    {searchData.top.title || searchData.top.name}
                  </p>
                  <p className={clsx(styles.subtitle)}>{`${handleNumber(
                    searchData.artists[0].totalFollow
                  )} quan tâm`}</p>
                </div>
              </div>
            )}

            {searchData?.songs &&
              searchData.songs.slice(0, 2).map((item) => {
                return (
                  <div
                    key={item.id}
                    className={clsx(styles.media)}
                    onClick={() => {
                      handleCLickSong(item);
                    }}
                  >
                    <div className={clsx(styles.mediaLeft)}>
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <div className={clsx(styles.mediaRight)}>
                      <p className={clsx(styles.type)}>Bài hát</p>
                      <p className={clsx(styles.title)}>
                        {" "}
                        {searchData?.top?.title || searchData?.top?.name}
                      </p>
                      <p className={clsx(styles.subtitle)}>
                        {item.artistsNames}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={clsx(styles.playListSection)}>
          <div className={clsx(styles.header)}>
            <div className={clsx(styles.thumbnail)}>
              <img src={searchData?.top?.thumbnail} alt="" />
            </div>
            <div className={clsx(styles.title)}>
              <h1 className={clsx(styles.subtitle)}>PLAYLIST NỔI BẬT</h1>
              <p className={clsx(styles.artistsNames)}> "Son-Tung-M-TP" </p>
            </div>
            <p className={clsx(styles.all)}>Tất cả</p>
          </div>
          <div className={clsx(styles.content)}>
            {searchData?.playlists?.slice(0, 5).map((item) => {
              return <SectionItem key={item.id} data={item} />;
            })}
          </div>
        </div>

        <div className={clsx(styles.listSongSection)}>
          <h1 className={clsx(styles.title)}>Bài hát</h1>
          <div className={styles.content}>
            {searchData?.songs?.map((item) => {
              return (
                <div className={styles.songItem} key={item.id}>
                  <SongItem data={item} className={"searchSong"} />
                </div>
              );
            })}
          </div>
        </div>

        <div className={clsx(styles.artistSection)}>
          <h1 className={clsx(styles.title)}>Nghệ Sĩ/OA</h1>
          <div className={clsx(styles.content)}>
            {searchData?.artists?.slice(0, 5).map((item) => {
              return <ArtistSection data={item} />;
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default AllSearch;
