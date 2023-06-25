import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudDownloadAlt, FaTshirt } from "react-icons/fa";
import { GiCutDiamond } from "react-icons/gi";
import { BsFillGearFill, BsFillPersonFill } from "react-icons/bs";
import ThemesSection from "../../../ThemesSection";
import AuthSection from "../../../AuthSection";
import clsx from "clsx";
import styles from "./Header.module.scss";
import icons from "../../../../ultils/icons";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import useModalActions from "../../../../hook/useModalActions";
import openAuth from "../../../../ultils/openAuth";
import { getToken } from "../../../../ultils/localStorage";
import { removeItemLocalStorage } from "../../../../ultils/localStorage";
const Header = () => {
  const isLoggedIn = getToken();
  const { isVisbleChangeTheme, isVisbleAuth } = useSelector(
    (state) => state.modal
  );
  console.log(isVisbleAuth);
  const { handleModalThemes, handleModalAuth } = useModalActions();

  const {
    BiPaint,
    IoIosArrowRoundBack,
    IoIosArrowRoundForward,
    IoIosSearch,
    AiOutlineRight,
    AiOutlineInfoCircle,
    BsTelephone,
    FaBuysellads,
    BsWindowDock,
    AiOutlineFileProtect,
  } = icons;

  const { info } = useSelector((state) => state.themes);
  const refs = [useRef(null), useRef(null)];
  const navigate = useNavigate();
  const [keyword, setKeyWord] = useState("");
  const [isSearchAcive, setIsSearchActive] = useState(false);
  const inputRef = useRef(null);
  const [isActiveSettingMenu, setIsActiveSettingMenu] = useState("");
  const [isActiveMenuList, setIsActiveMenuList] = useState("");
  const [isActiveButtonEffect, setIsActiveButtonEffect] = useState(false);

  const footerIconsSetting = [
    {
      id: uuidv4(),
      content: "Giới thiệu",
      iconLeft: <AiOutlineInfoCircle />,
      iconRight: <IoIosArrowRoundBack />,
    },
    {
      id: uuidv4(),
      content: "Liên hệ",
      iconLeft: <BsTelephone />,
      iconRight: <IoIosArrowRoundBack />,
    },
    {
      id: uuidv4(),
      content: "Quảng cáo",
      iconLeft: <FaBuysellads />,
      iconRight: <IoIosArrowRoundBack />,
    },
    {
      id: uuidv4(),
      content: "Thỏa thuận sử dụng",
      iconLeft: <BsWindowDock />,
      iconRight: <IoIosArrowRoundBack />,
    },
    {
      id: uuidv4(),
      content: "Chính sách bảo mật",
      iconLeft: <AiOutlineFileProtect />,
      iconRight: <IoIosArrowRoundBack />,
    },
  ];

  // useHook

  // Click Setting

  const handleSettingMenu = (type) => {
    setIsActiveSettingMenu(type);
    if (isActiveSettingMenu === type) {
      setIsActiveSettingMenu("");
    }
  };

  // ****//

  const handleMouseEnterSettingMenuList = (type) => {
    switch (type) {
      case "changeThemes":
        setIsActiveMenuList("changeThemes");
        break;

      default:
        break;
    }
  };

  const handleMouseOutSettingMenuList = () => {
    if (!isVisbleChangeTheme && isActiveMenuList !== "") {
      setIsActiveMenuList("");
    }
  };

  const handleSearch = (e) => {
    setKeyWord(e.target.value);
  };
  const handleActiveSearch = () => {
    setIsSearchActive(true);
  };
  const handleBlurSearch = () => {
    setIsSearchActive(false);
  };

  const handleButtonEffect = () => {
    setIsActiveButtonEffect(!isActiveButtonEffect);
  };

  const handleEnter = async (e) => {
    if (e.keyCode === 13) {
      const paramValue = encodeURIComponent(keyword);
      setIsSearchActive(false);
      navigate(`/tim-kiem/tat-ca?q=${paramValue}`);
    }
  };

  const handleLogOut = () => {
    removeItemLocalStorage("ACCESS_TOKEN");
    alert("bạn đã đăng xuất thành công");
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.headerLeft)}>
        <div className={clsx(styles.button)}>
          <button className={clsx(styles.btn, styles.btnNext)}>
            <IoIosArrowRoundBack />
          </button>
          <button className={clsx(styles.btn, styles.btnBack)}>
            <IoIosArrowRoundForward />
          </button>
        </div>
        <div
          className={clsx(styles.searchInput, {
            [styles.isSearchAcive]: isSearchAcive,
          })}
        >
          <button>
            <IoIosSearch />
          </button>
          <input
            className={styles.inputWrapper}
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
            value={keyword}
            onChange={handleSearch}
            onFocus={handleActiveSearch}
            onBlur={handleBlurSearch}
            onKeyUp={handleEnter}
          />

          {isSearchAcive && (
            <div className={styles.infoSearch}>
              <h1>Đề xuất cho bạn</h1>
              <h1>Tìm kiếm gần đây</h1>
            </div>
          )}
        </div>
      </div>
      <div className={clsx(styles.headerRight)}>
        <div className={clsx(styles.downloadApp)}>
          <FaCloudDownloadAlt />
          <span>Tải App</span>
        </div>
        <div ref={refs[0]} className={clsx(styles.setting)}>
          <span
            onClick={() => {
              handleSettingMenu("changeThemes");
            }}
          >
            <BsFillGearFill fontSize={20} />
          </span>

          {isActiveSettingMenu === "changeThemes" && (
            <div className={clsx(styles.settingDrop)}>
              <ul className={clsx(styles.navSetting)}>
                <li
                  className={clsx(styles.navItem)}
                  onMouseEnter={() => {
                    handleMouseEnterSettingMenuList("changeThemes");
                  }}
                  onMouseLeave={handleMouseOutSettingMenuList}
                >
                  <div className={clsx(styles.navLeft)}>
                    <BiPaint />
                    <h1>Giao diện</h1>
                  </div>
                  <span className={clsx(styles.navRight)}>
                    <AiOutlineRight />
                  </span>

                  {isActiveMenuList === "changeThemes" && (
                    <div className={clsx(styles.changeThemes)}>
                      <div
                        className={clsx(styles.header)}
                        onClick={() => {
                          handleModalThemes();
                          setIsActiveMenuList("changeThemes");
                        }}
                      >
                        <div className={clsx(styles.title)}>
                          <h1>Chủ đề</h1>
                          <span>
                            <AiOutlineRight />
                          </span>
                        </div>
                        <div className={clsx(styles.content)}>
                          <div className={clsx(styles.thumbnail)}>
                            <img src={info.linkImg} alt="" />
                          </div>

                          <span>{info.title}</span>
                        </div>
                      </div>
                      <div className={clsx(styles.footerMenuList)}>
                        <h1 className={clsx(styles.title)}>
                          Hiệu ứng chuyển động
                        </h1>
                        <div
                          className={clsx(styles.button, {
                            [styles.isActive]: isActiveButtonEffect,
                          })}
                          onClick={handleButtonEffect}
                        >
                          <div
                            className={clsx(styles.cirlce, {
                              [styles.isActive]: isActiveButtonEffect,
                            })}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
              <div className={clsx(styles.line)}></div>
              <ul className={clsx(styles.footer)}>
                {footerIconsSetting.map((item) => {
                  return (
                    <li key={item.id} className={clsx(styles.footerItem)}>
                      <div className={clsx(styles.footerItemLeft)}>
                        {item.iconLeft}
                        <h1>{item.content}</h1>
                      </div>
                      <span className={clsx(styles.footerItemRight)}>
                        <AiOutlineRight />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {isVisbleChangeTheme && <ThemesSection />}
        </div>
        <div ref={refs[1]} className={clsx(styles.person)}>
          <span
            onClick={() => {
              handleSettingMenu("auth");
            }}
          >
            <BsFillPersonFill fontSize={20} />
          </span>

          {isActiveSettingMenu === "auth" && !isLoggedIn && (
            <div className={clsx(styles.personDrop)}>
              <button onClick={openAuth} className={clsx(styles.button)}>
                Đăng nhập
              </button>
            </div>
          )}

          {isActiveSettingMenu === "auth" && isLoggedIn && (
            <div className={clsx(styles.personDrop)}>
              <button onClick={handleLogOut} className={clsx(styles.button)}>
                Đăng Xuất
              </button>
            </div>
          )}

          {isVisbleAuth && <AuthSection />}
        </div>
      </div>
    </div>
  );
};

export default Header;
