import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required:true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required:true,
  },
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required:true,
  },
} , {
  timestamps : true,
});

export default mongoose.model('comment' , commentSchema)
