const jsonwebtoken = require("jsonwebtoken");
const db = require("../models/index");
const User = db.User;
const { responseData, responseMessage } = require("../helpers/response");
const statusCode = require('../config/statusCode');
const { development } = require("../config/config");


exports.verifyToken = (req, res, next) => {
    const secret = development.secretKey;
    let token =
        req.headers["x-access-token"] || req.headers.authorization;
    if (token) {
        token = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
    } else {
        return responseData({ res, statusCode: statusCode.UNAUTHORIZED, success: 0, message: responseMessage("session_expired") });
    }
    jsonwebtoken.verify(token, secret, async (err, decoded) => {
        if (!decoded || err) {
            return responseData({ res, statusCode: statusCode.UNAUTHORIZED, success: 0, message: responseMessage("session_expired") });
        }
        const users = await User.findOne({
            where: {
                id: decoded.id
            }
        });
        if (!users) return responseData({ res, statusCode: statusCode.UNAUTHORIZED, success: 0, message: responseMessage("session_expired") });
        delete users.dataValues.password;
        req.user = users;
        next();
    });
}

exports.verifyAdmin = async (req, res, next) => {
    const users = await User.findOne({
        where: {
            id: req.user.id,
            role_id: 1
        }
    });
    if (!users) return responseData({ res, statusCode: statusCode.UNAUTHORIZED, success: 0, message: responseMessage("no_access") });
    next();
}