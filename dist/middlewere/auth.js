"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var verifyToken = function (req, res, next) {
    var authHeader = req.header('Authorization');
    var token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'token not found' });
    }
    try {
        var decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};
exports.default = verifyToken;
