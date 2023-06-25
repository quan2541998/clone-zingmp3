import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FavoritePlayListSchema = new Schema(
  {
    username: String,
    title: String,
    link: String,
    thumbnailM: String,
    sid: String,
  },
  {
    collection: "favoriteplaylist",
  }
);

const FavoritePlayListModel = mongoose.model(
  "favoriteplaylist",
  FavoritePlayListSchema
);

export default FavoritePlayListModel;
