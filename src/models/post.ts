const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    url: [{ type: String, default: [] }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Posts", postSchema);
