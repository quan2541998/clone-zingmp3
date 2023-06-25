import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import styles from "./PlayList.module.scss";
import Button from "../../../Button";
import icons from "../../../../ultils/icons";
import SongItem from "../../../SongItem";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../../../../services";
import * as actions from "../../../../store/actions";
import { Scrollbars } from "react-custom-scrollbars-2";

const PlayList = () => {
  const RightSideBarRef = useRef();
  const { BsThreeDots, BiTimeFive } = icons;
  const { currentSongData, currentAlbumData, playListData, recenlyData } =
    useSelector((state) => state.music);

  const { positionMouse } = useSelector((state) => state.controlDOM);

  const [isButtonValue, setIsButtonValue] = useState("playlist");
  const [dataPlayList, setDataPlayList] = useState(playListData);
  const dispatch = useDispatch();
  const [btnPlaylist, setBtnPlaylist] = useState([
    {
      text: " Danh sách phát",
      className: "btnPlayList",
      isActive: true,
      typeApi: "playlist",
    },
    {
      text: "Nghe gần đây",
      className: "btnPlayList",
      isActive: false,
      typeApi: "recently",
    },
  ]);

  useEffect(() => {
    dispatch(actions.setDOMRightSideBar(RightSideBarRef.current));
  }, []);

  useEffect(() => {
    setBtnPlaylist([
      {
        text: " Danh sách phát",
        className: "btnPlayList",
        isActive: true,
        typeApi: "playlist",
      },
      {
        text: "Nghe gần đây",
        className: "btnPlayList",
        isActive: false,
        typeApi: "recently",
      },
    ]);

    const oneCurrentSong = () => {
      if (currentSongData && currentAlbumData) {
        const isCheckSongDataExists = currentAlbumData?.song?.items?.some(
          (item) => item.encodeId === currentSongData.encodeId
        );
        if (isCheckSongDataExists) {
          const newDataPlayList = [...currentAlbumData?.song?.items]?.map(
            (item) => {
              if (item.encodeId === currentSongData.encodeId) {
                return {
                  ...item,
                  isPlayListCurrent: true,
                };
              } else {
                return {
                  ...item,
                  isPlayListCurrent: false,
                };
              }
            }
          );
          setDataPlayList(newDataPlayList);
          dispatch(actions.setPlayListData(newDataPlayList));
        } else {
          const newDataPlayList = [
            currentSongData,
            ...currentAlbumData?.song?.items,
          ].map((item) => {
            if (item.encodeId === currentSongData.encodeId) {
              return {
                ...item,
                isPlayListCurrent: true,
              };
            } else {
              return {
                ...item,
                isPlayListCurrent: false,
              };
            }
          });
          setDataPlayList(newDataPlayList);
          dispatch(actions.setPlayListData(newDataPlayList));
        }
      }
    };

    const multipleSong = () => {
      let curentIndex;
      dataPlayList.forEach((item, index) => {
        if (item.encodeId === currentSongData.encodeId) {
          curentIndex = index;
        }
      });

      const newDataPlayList = dataPlayList.map((item, index) => {
        if (item.encodeId === currentSongData.encodeId) {
          return {
            ...item,
            isPlayListCurrent: true,
            isBlurText: false,
          };
        } else {
          if (index < curentIndex) {
            return {
              ...item,
              isBlurText: true,
              isPlayListCurrent: false,
            };
          } else {
            return {
              ...item,
              isBlurText: false,
              isPlayListCurrent: false,
            };
          }
        }
      });

      setDataPlayList(newDataPlayList);
      dispatch(actions.setPlayListData(newDataPlayList));
    };

    if (positionMouse === "page") {
      oneCurrentSong();
    } else if (
      positionMouse === "rightSideBar" &&
      isButtonValue === "playlist"
    ) {
      if (dataPlayList !== null) {
        multipleSong();
      }
    } else if (
      positionMouse === "rightSideBar" &&
      isButtonValue === "recenly"
    ) {
      multipleSong();
    } else {
      oneCurrentSong();
    }
  }, [currentSongData]);

  const handleClickBtn = (typeApi) => {
    if (typeApi === "recently") {
      setIsButtonValue("recenly");
      setDataPlayList(recenlyData);
    } else {
      setIsButtonValue("playlist");
      setDataPlayList(playListData);
    }

    const changeDataBtn = btnPlaylist.map((item) => {
      if (item.typeApi === typeApi) {
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
    setBtnPlaylist(changeDataBtn);
  };

  return (
    <div ref={RightSideBarRef} className={clsx(styles.wrapper)}>
      <div className={styles.header}>
        <div className={styles.tabBars}>
          <div className={styles.headerLeft}>
            {btnPlaylist.map((item, index) => {
              return (
                <Button
                  key={index}
                  className={item.className}
                  text={item.text}
                  isActive={item.isActive}
                  handleClick={() => {
                    handleClickBtn(item.typeApi);
                  }}
                />
              );
            })}
          </div>
          <div className={styles.headerRight}>
            <Button isGreyBg={true}>
              <BiTimeFive fz={16} />
            </Button>
            <Button isGreyBg={true}>
              <BsThreeDots fz={16} />
            </Button>
          </div>
        </div>
      </div>
      <Scrollbars autoHide>
        <div className={styles.listSong}>
          {dataPlayList?.map((item, index) => {
            return (
              <SongItem
                key={index}
                data={item}
                className={"rightSideBar"}
                isPlayListCurrent={item.isPlayListCurrent}
                isBlurText={item.isBlurText}
              />
            );
          })}
        </div>
      </Scrollbars>
    </div>
  );
};

export default PlayList;
