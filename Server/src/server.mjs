import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import ConnectDB from "./config/connectDB.js";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import routerUser from "./apiRouter/userRouter.js";

ConnectDB();

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));

app.use(
  session({
    secret: "quan123",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", routerUser);

app.listen(port, () => {
  console.log(`Server ready at localhost:${port}`);
});
