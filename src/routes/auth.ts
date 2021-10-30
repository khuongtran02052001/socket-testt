import Express, { Request, Response } from "express";
import express from "express";
const router = express.Router();
import argon2 from "argon2";
import User from "../models/user";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewere/auth";
import multer from "multer";
// Get user , check user login roi hay chua
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    res.json({ success: true, user, fullname: user.fullname, avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server" });
  }
});

// get allUser
router.get('/getuser', async (req: Request, res: Response) => {
  const user = await User.find().select("-password")
  res.json({ success: true, user })
})

// get Oneuser
router.get('/getuser/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select("-password")
  res.json({ success: true, user })
})


// const store = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/avatar");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + ".jpg");
//   },
// });

// register
router.post(
  "/register",
  // upload.single("avatar"),
  async (req: Request, res: Response) => {
    const { username, password, avatar, fullname } = req.body;
    // if (!file)
    //   return res.status(400).json({ success: false, message: "Missing File" });
    // kiem tra xem co' du username or pass chua
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username or password" });

    try {
      // ktra xem da dang ky chua
      const user = await User.findOne({ username });
      if (user)
        return res
          .status(400)
          .json({ success: false, message: "UserName already" });

      // khong co van de` gi`
      const hashedPassword = await argon2.hash(password);

      // All ok them vao` collection
      const newUser = new User({
        username,
        avatar,
        password: hashedPassword,
        fullname,
      });
      await newUser.save();

      // return Token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN || "secret token"
      );
      return res.json({
        success: true,
        message: "User created successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server" });
    }
  }
);

//login
router.post("/login", async (req: Request, res: Response) => {
  const { username, password, avatar } = req.body;

  // check co nhap khong
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });

  // check co username khong
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    // check password
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Wrong Password" });

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN || "secret shit"
    );
    return res.json({
      success: true,
      message: "Login successfully",
      username,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
});

// Search User
router.get('/search', async (req: Request, res: Response) => {
  const { search }: any = req.query

  
  const user = await User.find({ fullname: search }).select('-password')
  try {
    if (user) return res.status(200).json({ user: user })
    return res.status(400).json({ success: false, message: "User Not Found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server" });
  }
})

export default router;
