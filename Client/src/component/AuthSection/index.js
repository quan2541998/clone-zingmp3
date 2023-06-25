import React, { useState } from "react";
import { createPortal } from "react-dom";
import icons from "../../ultils/icons";
import clsx from "clsx";
import styles from "./AuthSection.module.scss";
// import { registerApi, loginApi } from "../../services/authApi";
import authApi from "../../services/authApi";
import useModalActions from "../../hook/useModalActions";

const AuthSection = () => {
  const { register, login } = authApi;

  const { RiFacebookFill } = icons;
  const { handleModalAuth } = useModalActions();

  // State
  const [isTypeAuth, setIsTypeAuth] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOptionBtn = (type) => {
    setIsTypeAuth(type);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[^\u00C0-\u1EF9]+$/;
    if (!usernameRegex.test(username)) {
      alert("Vui lòng username không sử dụng dấu");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Vui lòng nhập một địa chỉ email hợp lệ");
      return;
    }
    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (password !== confirmPassword) {
      alert("Xác nhận mật khẩu không khớp");
      return;
    }
    try {
      await register({ username, email, password });

      alert("bạn đã đăng ký thành công");
    } catch (error) {
      return error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await login({ username: username, password: password });
      if (res.status === 200) {
        alert(res.data.message);
        localStorage.setItem("ACCESS_TOKEN", res.data.token);
      } else {
        alert("bạn đã đăng nhập thất bại");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.header)}>
          <h2 className={clsx(styles.title)}>
            {isTypeAuth === "register" ? "Đăng ký" : "Đăng nhập"}
          </h2>
          <div className={clsx(styles.platformLogin)}>
            <span className={clsx(styles.facebook)}>
              <RiFacebookFill />
            </span>
          </div>
        </div>
        <div className={clsx(styles.info)}>
          {isTypeAuth === "register" ? (
            <>
              <form onSubmit={handleRegister}>
                <div className={clsx(styles.formGroup)}>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={clsx(styles.formGroup)}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={clsx(styles.formGroup)}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={clsx(styles.formGroup)}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="confirm password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className={clsx(styles.formGroup)}>
                  <button type="submit">Đăng ký</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleLogin}>
                <div className={clsx(styles.formGroup)}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={clsx(styles.formGroup)}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className={clsx(styles.formGroup)}>
                  <button type="submit">Đăng nhập</button>
                </div>
              </form>
            </>
          )}
        </div>

        {isTypeAuth === "register" ? (
          <>
            <div className={clsx(styles.footer)}>
              <p>Bạn đã có tài khoản</p>
              <span
                onClick={() => {
                  handleOptionBtn("login");
                }}
              >
                Đăng nhập ngay
              </span>
            </div>
          </>
        ) : (
          <>
            <div className={clsx(styles.footer)}>
              <p>Bạn chưa có tài khoản</p>
              <span
                onClick={() => {
                  handleOptionBtn("register");
                }}
              >
                Đăng ký ngay
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthSection;
