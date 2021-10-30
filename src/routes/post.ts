import { Request, Response } from "express";

import express from "express";
const router = express.Router();
import verifyToken from "../middlewere/auth";
import Post from "../models/post";
// import multer from "multer";
import Like from "../models/like";
import Comment from "../models/cmt";
import mongoose from "mongoose";
import Noti from "../models/notification";
import User from "../models/user";
// const store = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + ".jpg");
//   },
// });

// const upload = multer({ storage: store });
// up nhieu anh
router.post(
  "/",
  verifyToken,
  // upload.array("post", 2),
  async (req: Request, res: Response) => {
    const { title , url} = req.body;

    // const url = (req.files as Array<any>).map((file: any) => file?.filename);

    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is require" });

    try {
      const newPost = new Post({
        title,
        url,
        user: req.userId,
      });

      await newPost.save();
      res.json({ success: true, message: "Post Successfully", post: newPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server" });
    }
  }
);

// lay post
router.get("/", async (req: Request, res: Response) => {
  try {
    // const post = await Post.find().populate("user", [
    //   "username",
    // ]);
    const { _limit = 10, _page = 1 } = req.query;
    const totalRows = await Post.countDocuments();
    const posts = await Post.find()
      .populate("user", ["username", "avatar", "fullname"])
      .populate("likes")
      .populate("comments")
      .sort({ createdAt: -1 })
      .skip(((_page as number) - 1) * (_limit as number))
      .limit((_limit as number) * 1);
    res.send({ posts, totalRows });
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

// notification
router.post(
  "/notification",
  verifyToken,
  async (req: Request, res: Response) => {
    const { message, receiverId, postId } = req.body;
    if (!message) return res.status(401).json({ success: false });

    try {
      const newNotification = new Noti({
        message,
        sender: req.userId,
        receiver: receiverId,
        postId,
      });

      await newNotification.save();
      res.json({
        success: true,

        newNotification: newNotification,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server" });
    }
  }
);
// get notification
router.get(
  "/notification",
  verifyToken,
  async (req: Request, res: Response) => {
    const { _limit = 10, _page = 1 } = req.query;

    const totalRows = await Post.countDocuments();
    try {
      const noti = await Noti.find({ receiver: req.userId })

        .populate("sender", ["username", "avatar"])
        .populate("postId")
        .sort({ createdAt: -1 })
        .skip(((_page as number) - 1) * (_limit as number))
        .limit((_limit as number) * 1);
      res.send({ noti, totalRows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server" });
    }
  }
);

// lay 1 posts
router.get("/:id", async (req: Request, res: Response) => {
  try {
    // const post = await Post.find().populate("user", [
    //   "username",
    // ]);
    const post = await Post.findById(req.params.id)
      .populate("user", ["username", "avatar", "fullname"])
      .populate("likes")
      .populate({
        path: "comments",
        populate: {
          path: "authorId",
        },
      });
    res.send({ post });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

// cap nhat chinh sua post
router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is require" });

  try {
    let updated = {
      title,
    };

    const updatePost = { _id: req.params.id, user: req.userId };

    updated = await Post.findOneAndUpdate(updatePost, updated, { new: true });

    // check xem phai? nguoi` dang bai` do' khong , neu khong khong cho update
    if (!updated)
      return res
        .status(401)
        .json({ success: false, message: "Post not found" });

    res.json({ success: true, message: "Update successfully", post: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
});

// Delete
// cach 1
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const postdeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postdeleteCondition);

    // check xem phai? nguoi` dang bai` do' khong , neu khong khong cho delete
    if (!deletedPost)
      return res
        .status(401)
        .json({ success: false, message: "Post not found" });

    res.json({
      success: true,
      message: "Remove successfully",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
});

// like and dislike
// cach 2
router.post(
  "/like/:postId",
  verifyToken,
  async (req: Request, res: Response) => {
    const { postId } = req.params;
    try {
      const author = await Like.findOne({ authorId: req.userId, postId });
      const post = await Post.findById(postId);

      if (author) {
        await author.deleteOne({ _id: author._id } as mongoose.QueryOptions);
        post.likes = post.likes.filter((like: any) => like !== author._id);
        await post.save();
        return res.json({ success: true, likeId: author._id, type: "dislike" });
      }
      const newLike = new Like({
        authorId: req.userId,
        postId,
      });
      post.likes.push(newLike._id);
      await post.save();
      await newLike.save();
    
      return res.json({ success: true, newLike, type: "like" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server" });
    }
  }
);

// comment
router.post(
  "/comment/:postId",
  verifyToken,
  async (req: Request, res: Response) => {
    const { content } = req.body;
    const { postId } = req.params;
    const user = await User.findById(req.userId);

    if (!content) {
      res.status(404).json({ success: false });
    }
    let cmt = new Comment({
      content,
      postId,
      authorId: req.userId,
    });
    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: cmt._id } }
    );
    await cmt.save();
    const newCmt = { ...(cmt as any)._doc, authorId: user };
    res.json({ success: true, newCmt });
  }
);

// Delete
// router.delete("/comment/:id", verifyToken, async (req: Request, res: Response) => {
//   try {
//     const cmtdeleteCondition = { _id: req.params.id, user: req.userId };
//     const deletedCmt = await Post.findOneAndDelete(cmtdeleteCondition);

//     // check xem phai? nguoi` dang bai` do' khong , neu khong khong cho delete
//     if (!deletedCmt)
//       return res
//         .status(401)
//         .json({ success: false, message: "Comment not found" });

//     res.json({
//       success: true,
//       message: "Remove successfully",
//       comment: deletedCmt,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server" });
//   }
// });

// get post theo user

router.get("/post/user/:id", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ user: req.params.id });
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
  }
});

export default router;
