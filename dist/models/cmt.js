"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "post",
        required: true,
    },
    authorId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('comment', commentSchema);
