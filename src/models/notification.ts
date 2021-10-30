import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    message: {
      type: String,
      required: true,
    },
    postId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("notification", notificationSchema);
