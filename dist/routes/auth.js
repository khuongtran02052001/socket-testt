"use strict";
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
var argon2_1 = __importDefault(require("argon2"));
var user_1 = __importDefault(require("../models/user"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_1 = __importDefault(require("../middlewere/auth"));
// Get user , check user login roi hay chua
router.get("/", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.findById(req.userId).select("-password")];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "user not found" })];
                res.json({ success: true, user: user, fullname: user.fullname, avatar: user.avatar });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ success: false, message: "Internal server" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get allUser
router.get('/getuser', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.find().select("-password")];
            case 1:
                user = _a.sent();
                res.json({ success: true, user: user });
                return [2 /*return*/];
        }
    });
}); });
// get Oneuser
router.get('/getuser/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(req.params.id).select("-password")];
            case 1:
                user = _a.sent();
                res.json({ success: true, user: user });
                return [2 /*return*/];
        }
    });
}); });
// const store = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/avatar");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + ".jpg");
//   },
// });
// register
router.post("/register", 
// upload.single("avatar"),
function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, avatar, fullname, user, hashedPassword, newUser, accessToken, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, avatar = _a.avatar, fullname = _a.fullname;
                // if (!file)
                //   return res.status(400).json({ success: false, message: "Missing File" });
                // kiem tra xem co' du username or pass chua
                if (!username || !password)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "Missing username or password" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 2:
                user = _b.sent();
                if (user)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "UserName already" })];
                return [4 /*yield*/, argon2_1.default.hash(password)];
            case 3:
                hashedPassword = _b.sent();
                newUser = new user_1.default({
                    username: username,
                    avatar: avatar,
                    password: hashedPassword,
                    fullname: fullname,
                });
                return [4 /*yield*/, newUser.save()];
            case 4:
                _b.sent();
                accessToken = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN || "secret token");
                return [2 /*return*/, res.json({
                        success: true,
                        message: "User created successfully",
                        accessToken: accessToken,
                    })];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({ success: false, message: "Internal server" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//login
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, avatar, user, passwordValid, accessToken, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, avatar = _a.avatar;
                // check co nhap khong
                if (!username || !password)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "Missing username or password" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "User not found" })];
                return [4 /*yield*/, argon2_1.default.verify(user.password, password)];
            case 3:
                passwordValid = _b.sent();
                if (!passwordValid)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: "Wrong Password" })];
                accessToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.ACCESS_TOKEN || "secret shit");
                return [2 /*return*/, res.json({
                        success: true,
                        message: "Login successfully",
                        username: username,
                        accessToken: accessToken,
                    })];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({ success: false, message: "Internal server" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Search User
router.get('/search', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                search = req.query.search;
                return [4 /*yield*/, user_1.default.find({ fullname: search }).select('-password')];
            case 1:
                user = _a.sent();
                try {
                    if (user)
                        return [2 /*return*/, res.status(200).json({ user: user })];
                    return [2 /*return*/, res.status(400).json({ success: false, message: "User Not Found" })];
                }
                catch (error) {
                    res.status(500).json({ success: false, message: "Internal server" });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
