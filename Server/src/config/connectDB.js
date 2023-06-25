import mongoose from "mongoose";
import bluebird from "bluebird";
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = () => {
  mongoose.Promise = bluebird;

  const URI = `mongodb+srv://quan2541998:gVpDnbc2e7YrTplB@cluster0.a7evb7l.mongodb.net/`;

  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default ConnectDB;
