import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('Like' , likeSchema)
