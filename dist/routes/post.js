"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_1 = __importDefault(require("../middlewere/auth"));
var post_1 = __importDefault(require("../models/post"));
// import multer from "multer";
var like_1 = __importDefault(require("../models/like"));
var cmt_1 = __importDefault(require("../models/cmt"));
var notification_1 = __importDefault(require("../models/notification"));
var user_1 = __importDefault(require("../models/user"));
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
router.post("/", auth_1.default, 
// upload.array("post", 2),
function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, url, newPost, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, url = _a.url;
                // const url = (req.files as Array<any>).map((file: any) => file?.filename);
                if (!title)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "Title is require" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newPost = new post_1.default({
                    title: title,
                    url: url,
                    user: req.userId,
                });
                return [4 /*yield*/, newPost.save()];
            case 2:
                _b.sent();
                res.json({ success: true, message: "Post Successfully", post: newPost });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ success: false, message: "Internal server" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// lay post
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _limit, _c, _page, totalRows, posts, error_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                _a = req.query, _b = _a._limit, _limit = _b === void 0 ? 10 : _b, _c = _a._page, _page = _c === void 0 ? 1 : _c;
                return [4 /*yield*/, post_1.default.countDocuments()];
            case 1:
                totalRows = _d.sent();
                return [4 /*yield*/, post_1.default.find()
                        .populate("user", ["username", "avatar", "fullname"])
                        .populate("likes")
                        .populate("comments")
                        .sort({ createdAt: -1 })
                        .skip((_page - 1) * _limit)
                        .limit(_limit * 1)];
            case 2:
                posts = _d.sent();
                res.send({ posts: posts, totalRows: totalRows });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _d.sent();
                res.sendStatus(500);
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// notification
router.post("/notification", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, message, receiverId, postId, newNotification, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, message = _a.message, receiverId = _a.receiverId, postId = _a.postId;
                if (!message)
                    return [2 /*return*/, res.status(401).json({ success: false })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newNotification = new notification_1.default({
                    message: message,
                    sender: req.userId,
                    receiver: receiverId,
                    postId: postId,
                });
                return [4 /*yield*/, newNotification.save()];
            case 2:
                _b.sent();
                res.json({
                    success: true,
                    newNotification: newNotification,
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({ success: false, message: "Internal server" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// get notification
router.get("/notification", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _limit, _c, _page, totalRows, noti, error_4;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, _b = _a._limit, _limit = _b === void 0 ? 10 : _b, _c = _a._page, _page = _c === void 0 ? 1 : _c;
                return [4 /*yield*/, post_1.default.countDocuments()];
            case 1:
                totalRows = _d.sent();
                _d.label = 2;
            case 2:
                _d.trys.push([2, 4, , 5]);
                return [4 /*yield*/, notification_1.default.find({ receiver: req.userId })
                        .populate("sender", ["username", "avatar"])
                        .populate("postId")
                        .sort({ createdAt: -1 })
                        .skip((_page - 1) * _limit)
                        .limit(_limit * 1)];
            case 3:
                noti = _d.sent();
                res.send({ noti: noti, totalRows: totalRows });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _d.sent();
                console.log(error_4);
                res.status(500).json({ success: false, message: "Internal server" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// lay 1 posts
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_1.default.findById(req.params.id)
                        .populate("user", ["username", "avatar", "fullname"])
                        .populate("likes")
                        .populate({
                        path: "comments",
                        populate: {
                            path: "authorId",
                        },
                    })];
            case 1:
                post = _a.sent();
                res.send({ post: post });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).send(error_5);
                console.log(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// cap nhat chinh sua post
router.put("/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, updated, updatePost, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                title = req.body.title;
                if (!title)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "Title is require" })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                updated = {
                    title: title,
                };
                updatePost = { _id: req.params.id, user: req.userId };
                return [4 /*yield*/, post_1.default.findOneAndUpdate(updatePost, updated, { new: true })];
            case 2:
                updated = _a.sent();
                // check xem phai? nguoi` dang bai` do' khong , neu khong khong cho update
                if (!updated)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ success: false, message: "Post not found" })];
                res.json({ success: true, message: "Update successfully", post: updated });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                res.status(500).json({ success: false, message: "Internal server" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete
// cach 1
router.delete("/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postdeleteCondition, deletedPost, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postdeleteCondition = { _id: req.params.id, user: req.userId };
                return [4 /*yield*/, post_1.default.findOneAndDelete(postdeleteCondition)];
            case 1:
                deletedPost = _a.sent();
                // check xem phai? nguoi` dang bai` do' khong , neu khong khong cho delete
                if (!deletedPost)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ success: false, message: "Post not found" })];
                res.json({
                    success: true,
                    message: "Remove successfully",
                    post: deletedPost,
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                res.status(500).json({ success: false, message: "Internal server" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// like and dislike
// cach 2
router.post("/like/:postId", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, author_1, post, newLike, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, like_1.default.findOne({ authorId: req.userId, postId: postId })];
            case 2:
                author_1 = _a.sent();
                return [4 /*yield*/, post_1.default.findById(postId)];
            case 3:
                post = _a.sent();
                if (!author_1) return [3 /*break*/, 6];
                return [4 /*yield*/, author_1.deleteOne({ _id: author_1._id })];
            case 4:
                _a.sent();
                post.likes = post.likes.filter(function (like) { return like !== author_1._id; });
                return [4 /*yield*/, post.save()];
            case 5:
                _a.sent();
                return [2 /*return*/, res.json({ success: true, likeId: author_1._id, type: "dislike" })];
            case 6:
                newLike = new like_1.default({
                    authorId: req.userId,
                    postId: postId,
                });
                post.likes.push(newLike._id);
                return [4 /*yield*/, post.save()];
            case 7:
                _a.sent();
                return [4 /*yield*/, newLike.save()];
            case 8:
                _a.sent();
                return [2 /*return*/, res.json({ success: true, newLike: newLike, type: "like" })];
            case 9:
                error_8 = _a.sent();
                console.log(error_8);
                res.status(500).json({ success: false, message: "Internal server" });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
// comment
router.post("/comment/:postId", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var content, postId, user, cmt, newCmt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = req.body.content;
                postId = req.params.postId;
                return [4 /*yield*/, user_1.default.findById(req.userId)];
            case 1:
                user = _a.sent();
                if (!content) {
                    res.status(404).json({ success: false });
                }
                cmt = new cmt_1.default({
                    content: content,
                    postId: postId,
                    authorId: req.userId,
                });
                return [4 /*yield*/, post_1.default.findOneAndUpdate({ _id: postId }, { $push: { comments: cmt._id } })];
            case 2:
                _a.sent();
                return [4 /*yield*/, cmt.save()];
            case 3:
                _a.sent();
                newCmt = __assign(__assign({}, cmt._doc), { authorId: user });
                res.json({ success: true, newCmt: newCmt });
                return [2 /*return*/];
        }
    });
}); });
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
router.get("/post/user/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_1.default.find({ user: req.params.id })];
            case 1:
                posts = _a.sent();
                res.json({ success: true, posts: posts });
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.log(error_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
