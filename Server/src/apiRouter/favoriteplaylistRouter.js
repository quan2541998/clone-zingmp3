import express from "express";
import jwt from "jsonwebtoken";

const favoriteplaylistRouter = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, "quan123");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

favoriteplaylistRouter.get("/private/mymusic", verifyToken, (req, res) => {
  console.log(req.user);
  res.json("quan");
});

favoriteplaylistRouter.post("/private/mymusic", verifyToken, (req, res) => {
  console.log(req.user.username);
  res.json("quan");
});
export default favoriteplaylistRouter;
