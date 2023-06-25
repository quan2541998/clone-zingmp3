import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import moment from "moment";
import { toast } from "react-toastify";

import styles from "./PlayerControls.module.scss";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../store/actions";
import * as apis from "../../../../services";
import icons from "../../../../ultils/icons";

const PlayerControls = () => {
  // Redux
  const { currentSongId, isPlayAudioFirst, listSongs, isAlbum } = useSelector(
    (state) => state.music
  );

  const dispatch = useDispatch();

  // useRef
  const thumbRef = useRef();
  const interVal = useRef();
  const audioRef = useRef();
  const inputRef = useRef();

  // useState
  const [audio, setAudio] = useState("");
  const [songInfo, setSongInfo] = useState(null);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [isPlayAudio, setIsPlayAudio] = useState(false);
  const [isShuffle, setIsSShuffle] = useState(false);
  const [replay, setReplay] = useState("none");
  const [isVolume, setIsVolume] = useState(inputRef?.current?.value / 100);
  const [dataPrevSong, setDataPrevSong] = useState(null);

  const {
    AiOutlineHeart,
    AiFillHeart,
    BsThreeDots,
    RxShuffle,
    CiRepeat,
    AiOutlineStepBackward,
    AiOutlineStepForward,
    BsPauseFill,
    BsPlayFill,
    RiRepeatOneFill,
    BsFillVolumeDownFill,
    BsFillVolumeMuteFill,
  } = icons;

  let prevDataSong = null;

  useEffect(() => {
    if (interVal.current) {
      clearInterval(interVal.current);
    }
    const fetchDetailSong = async () => {
      const [resInfoSong, resSourceSong] = await Promise.all([
        apis.getDetailSong(currentSongId),
        apis.getSong(currentSongId),
      ]);
      if (resInfoSong.data.err === 0) {
        setSongInfo(resInfoSong.data.data);
        setDataPrevSong(resInfoSong.data.data);
        dispatch(actions.setCurrentSongData(resInfoSong.data.data));
        dispatch(actions.setRecenlyData(resInfoSong.data.data));
      }
      if (resSourceSong.data.err === 0) {
        const dataSong = resSourceSong.data.data["128"];
        setAudio(dataSong);

        setCurrentSecond(0);
        thumbRef.current.style.width = 0;

        if (isPlayAudioFirst) {
          setIsPlayAudio(false);
        } else {
          setIsPlayAudio(true);
        }
      } else {
        if (interVal.current) {
          clearInterval(interVal.current);
        }
        setAudio("");
        setIsPlayAudio(false);

        if (interVal.current) {
          clearInterval(interVal.current);
        }
        setCurrentSecond(0);
        thumbRef.current.style.width = 0;
        const ToastWarning = () => {
          toast.warn(`${resSourceSong.data.msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        };

        ToastWarning();
      }
    };

    fetchDetailSong();
  }, [currentSongId]);

  useEffect(() => {
    if (isPlayAudioFirst) {
      setIsPlayAudio(false);
    }

    if (isPlayAudio) {
      const playVideo = async () => {
        await audioRef.current.play();
      };
      playVideo();
    }
  }, [audio]);

  useEffect(() => {
    if (interVal.current) {
      clearInterval(interVal.current);
    }

    const togglePlayAudio = async () => {
      if (isPlayAudio) {
        await audioRef.current.play();
        interVal.current = setInterval(() => {
          const currentTime = audioRef.current.currentTime;
          const totalTime = audioRef.current.duration;
          const percent = ((currentTime / totalTime) * 100).toFixed(2);
          thumbRef.current.style.width = `${percent}%`;
          setCurrentSecond(Math.round(currentTime));
        }, 1);
      } else {
        audioRef.current.pause();
        if (interVal.current) {
          clearInterval(interVal.current);
        }
      }
    };

    togglePlayAudio();
  }, [isPlayAudio, audio]);

  const handleChangeCurrentTime = async (e) => {
    const position = e.pageX - e.target.offsetLeft;
    const width = e.target.clientWidth;
    const percent = ((position / width) * 100).toFixed(2);

    const currentTime = Math.round((percent * audioRef.current.duration) / 100);
    audioRef.current.currentTime = currentTime;
    thumbRef.current.style.width = `${percent}%`;
    setCurrentSecond(Math.round(currentTime));
    if (isPlayAudio) await audioRef.current.play();
  };

  const handleTogglePlayMusic = async () => {
    if (isPlayAudio) {
      audioRef.current.pause();
      setIsPlayAudio(!isPlayAudio);
      dispatch(actions.playVideo(false));
    } else {
      await audioRef.current.play();
      setIsPlayAudio(!isPlayAudio);
    }
  };

  const handleToggleShuffle = () => {
    setIsSShuffle(!isShuffle);
  };

  const randomShuffle = () => {
    if (isShuffle) {
      const randomIndex = Math.round(Math.random() * listSongs?.length) - 1;
      let randomSongId = listSongs[randomIndex].encodeId;
      dispatch(actions.setCurrentSongId(randomSongId));
      dispatch(actions.playVideo(false));
    }
  };

  const toggleReplayAduio = () => {
    switch (replay) {
      case "none":
        setReplay("replayAll");
        break;
      case "replayAll":
        setReplay("replayOne");
        break;
      case "replayOne":
        setReplay("none");
        break;
      default:
        break;
    }
  };

  const handleChangeSong = (type) => {
    if (isAlbum) {
      let currentSongIndex;
      listSongs?.forEach((item, index) => {
        if (item.encodeId === currentSongId) {
          currentSongIndex = index;
        }
      });

      if (type === "next") {
        if (isShuffle) {
          randomShuffle();
        } else {
          let nextSongIndex;
          let nextSongId;
          nextSongIndex = currentSongIndex + 1;
          if (nextSongIndex === listSongs.length) {
            nextSongId = listSongs[0]?.encodeId;
            dispatch(actions.setCurrentSongId(nextSongId));
            dispatch(actions.playVideo(false));
          } else {
            nextSongId = listSongs[nextSongIndex]?.encodeId;
            dispatch(actions.setCurrentSongId(nextSongId));
            dispatch(actions.playVideo(false));
          }
        }
      }

      if (type === "back") {
        if (isShuffle) {
          randomShuffle();
        } else {
          let backSongIndex;
          let backSongId;
          backSongIndex = currentSongIndex - 1;
          if (backSongIndex === -1) {
            backSongId = listSongs[listSongs.length - 1]?.encodeId;
            dispatch(actions.setCurrentSongId(backSongId));
            dispatch(actions.playVideo(false));
          } else {
            backSongId = listSongs[backSongIndex]?.encodeId;
            dispatch(actions.setCurrentSongId(backSongId));
            dispatch(actions.playVideo(false));
          }
        }
      }
    }
  };

  const handleEndSong = () => {
    console.log(replay);
    if (isShuffle) {
      switch (replay) {
        case "none":
          if (currentSongId !== listSongs[listSongs.length - 1]?.encodeId) {
            randomShuffle();
          } else {
            setIsPlayAudio(false);
          }
          break;
        case "replayAll":
          randomShuffle();
          break;
        case "replayOne":
          audioRef.current.currentTime = 0;
          audioRef.current.load();
          audioRef.current.play();

          break;
        default:
          break;
      }
    } else {
      switch (replay) {
        case "none":
          if (currentSongId !== listSongs[listSongs.length - 1]?.encodeId) {
            let currentSongIndex;
            listSongs?.forEach((item, index) => {
              if (item.encodeId === currentSongId) {
                currentSongIndex = index;
              }
            });

            let nextSongIndex;
            let nextSongId;
            nextSongIndex = currentSongIndex + 1;
            nextSongId = listSongs[nextSongIndex]?.encodeId;
            dispatch(actions.setCurrentSongId(nextSongId));
            dispatch(actions.playVideo(false));
          } else {
            setIsPlayAudio(false);
          }
          break;
        case "replayAll":
          let currentSongIndex;
          let nextSongIndex;
          let nextSongId;
          listSongs?.forEach((item, index) => {
            if (item.encodeId === currentSongId) {
              currentSongIndex = index;
            }
          });
          nextSongIndex = currentSongIndex + 1;

          if (nextSongIndex === listSongs.length) {
            nextSongId = listSongs[0]?.encodeId;
            dispatch(actions.setCurrentSongId(nextSongId));
            dispatch(actions.playVideo(false));
          } else {
            nextSongId = listSongs[nextSongIndex]?.encodeId;
            dispatch(actions.setCurrentSongId(nextSongId));
            dispatch(actions.playVideo(false));
          }
          break;
        case "replayOne":
          audioRef.current.currentTime = 0;
          audioRef.current.load();
          audioRef.current.play();
          break;
        default:
          break;
      }
    }
  };

  const handleVolume = (e) => {
    setIsVolume(e.target.value / 100);
    audioRef.current.volume = isVolume;
  };

  const handleIconVolume = () => {
    if (isVolume > 0) {
      setIsVolume(0);
    }
  };

  return (
    <div className={clsx(styles.playerControls)}>
      <div className={clsx(styles.playerControlsLeft)}>
        <div className={clsx(styles.infoMedia)}>
          <div className={clsx(styles.thumbnail)}>
            <img src={songInfo?.thumbnail} alt="thumnail" />
          </div>
          <div className={clsx(styles.titleSong)}>
            <div className={clsx(styles.songName)}>
              <span>{songInfo?.title}</span>
            </div>
            <div className="singerName">
              <span>{songInfo?.artistsNames}</span>
            </div>
          </div>
          <div className={clsx(styles.custom)}>
            <div className={clsx(styles.favourite)}>
              <span className={clsx(styles.icon)}>
                <AiOutlineHeart />
              </span>
              <span className={clsx(styles.icon)}>
                <AiFillHeart />
              </span>
            </div>
            <div className={clsx(styles.config)}>
              <BsThreeDots />
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.playerControlsCenter)}>
        <div className={clsx(styles.media)}>
          <div className={clsx(styles.listPlayMedia)}>
            <span
              onClick={handleToggleShuffle}
              className={clsx(styles.icon, {
                [styles.shuffleActive]: isShuffle,
              })}
            >
              <RxShuffle />
            </span>

            <div
              onClick={() => {
                handleChangeSong("back");
              }}
              className={clsx(styles.icon, {
                [styles.disableAction]: !isAlbum,
              })}
            >
              <AiOutlineStepBackward />
            </div>
            <div
              className={clsx(styles.playCustom)}
              onClick={handleTogglePlayMusic}
            >
              <span className={styles.isPlayCircle}>
                {isPlayAudio ? <BsPauseFill /> : <BsPlayFill />}
              </span>
            </div>
            <div
              onClick={() => {
                handleChangeSong("next");
              }}
              className={clsx(styles.icon, {
                [styles.disableAction]: !isAlbum,
              })}
            >
              <AiOutlineStepForward />
            </div>
            <div onClick={toggleReplayAduio} className={clsx(styles.icon)}>
              {replay === "none" ? (
                <CiRepeat fontSize={"18px"} />
              ) : replay === "replayOne" ? (
                <RiRepeatOneFill
                  color={"var(--color-primary)"}
                  fontSize={"18px"}
                />
              ) : (
                <CiRepeat color={"var(--color-primary)"} fontSize={"18px"} />
              )}
            </div>
          </div>
          <div className={clsx(styles.progressBar)}>
            <audio ref={audioRef} src={audio} onEnded={handleEndSong}></audio>
            <span className={clsx(styles.timeLeft)}>
              {moment.utc(currentSecond * 1000).format("mm:ss")}
            </span>
            <div
              className={clsx(styles.durationBar)}
              onClick={handleChangeCurrentTime}
            >
              <div ref={thumbRef} className={clsx(styles.currentBar)}></div>
            </div>
            <span className={clsx(styles.timeRight)}>
              {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
            </span>
          </div>
        </div>
      </div>
      <div className={clsx(styles.playerControlsRight)}>
        <div className={clsx(styles.controlVolume)}>
          <div onClick={handleIconVolume}>
            <BsFillVolumeDownFill fontSize={24} />
          </div>
          <input ref={inputRef} onChange={handleVolume} type="range" />
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
