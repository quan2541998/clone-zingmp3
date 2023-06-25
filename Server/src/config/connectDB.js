import mongoose from "mongoose";
import bluebird from "bluebird";
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = () => {
  mongoose.Promise = bluebird;

  const URI = `${process.env.DB_CONNECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default ConnectDB;
