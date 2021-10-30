import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    fullname:{
      type:String,
      require: true,
    }
  },

  { timestamps: true }
);

export type UserType = Document & {
  username: string;
  password: string;
  avatar: string ;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
};

export default mongoose.model<UserType>("users", userSchema);
