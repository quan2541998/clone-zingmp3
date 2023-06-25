import express from "express";
import UserModel from "../models/user.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";

const routerUser = express.Router();

routerUser.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const isExistingUser = await UserModel.findOne({ username });
    if (isExistingUser) {
      return res.status(200).json({ message: "User đã tồn tại" });
    } else {
      await UserModel.create({
        username,
        local: {
          email,
          password,
        },
      });
      return res.status(200).json({ message: "Bạn đã đăng ký thành công" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Bạn đã đăng ký thất bại", error });
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Sai tên đăng nhập" });
      }
      if (user.local.password !== password) {
        return done(null, false, { message: "Sai mật khẩu" });
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

routerUser.post("/login", passport.authenticate("local"), (req, res) => {
  const username = { username: req.user.username };
  jwt.sign(username, "quan123", (err, token) => {
    if (err) {
      return res.status(500).json("Lỗi server");
    } else {
      return res
        .status(200)
        .json({ token, message: "Bạn đã đăng nhập thành công" });
    }
  });
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

export default routerUser;
