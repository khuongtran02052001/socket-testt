"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var postSchema = mongoose.Schema({
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
}, { timestamps: true });
exports.default = mongoose.model("Posts", postSchema);
