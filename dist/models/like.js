"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var likeSchema = new Schema({
    authorId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "user",
        required: true,
    },
    postId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
});
exports.default = mongoose_1.default.model('Like', likeSchema);
