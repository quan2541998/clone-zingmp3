import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    local: {
      email: { type: String, trim: true },
      password: String,
    },
    facebook: {
      uid: String,
      token: String,
      email: { type: String, trim: true },
    },
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
  },
  {
    collection: "user",
  }
);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
