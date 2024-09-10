const bcrypt = require('bcrypt');
const statusCode = require('../config/statusCode');
const constant = require("./constant");
const saltRounds = 10;
const common_api = require('./common_api')
const User = require('../models/user')
const jsonwebtoken = require("jsonwebtoken");


const passwordBcrypt = async (password) => {
    try {
        let bcryptPass = await bcrypt.hash(password, 10);
        return bcryptPass;
    } catch (error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: error.message
        };
    }
};

// Check password function
const checkPassword = async (user, password) => {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
};


exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
const generateToken = async (user) => {
    let query = { where: { id: user.id } };
    const user_details = await common_api.getDataById(query, User);
    const get_user_role_id = user_details.data.dataValues.role_id
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken.sign(
        {
            id: user.id,
            name: user_details.data.dataValues.firstName,
            email: user.email,
            role_id: user_details.data.dataValues.role_id,
            email: user.email,
            deleted: user.deleted,
        },
        secret,
        {
            expiresIn: constant.expires_in,
        }
    );
    return token;
};

module.exports = { passwordBcrypt, checkPassword, generateToken }


