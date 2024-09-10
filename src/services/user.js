// services/authService.js
const User = require('../models/user');
const common_api = require('../helpers/common_api')
const { passwordBcrypt, checkPassword, generateToken } = require('../helpers/validation');
const { responseMessage, } = require('../helpers/response');
const statusCode = require('../config/statusCode');

exports.registerUser = async (body) => {
  if (Object.keys(body).length == 0) {
    return {
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: responseMessage('empty_body')
    };
  }
  let query = { where: { email: body.email } };
  const isUserExisting = await common_api.getDataById(query, User);
  if (isUserExisting.data || isUserExisting?.data?.deleted === 0) {
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage("already_exists", "User")
    };
  }
  body.password = await passwordBcrypt(body.password);
  const userData = await common_api.createData(body, User);
  return {
    statusCode: statusCode.SUCCESS,
    success: 1,
    message: responseMessage('register_Mail'),
  };
}

exports.loginUser = async (body) => {
  if (!body.email || !body.password)
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: responseMessage("empty_login_body"),
    };
  let query = { where: { email: body.email } };
  const user = await common_api.getDataById(query, User);
  if (user.error)
    return {
      statusCode: statusCode.NOTFOUND,
      success: 0,
      message: responseMessage("wrong"),
    };
  else if (!user.data)
    return {
      statusCode: statusCode.NOTFOUND,
      success: 0,
      message: responseMessage("user_not_matched"),
    };
  const isPasswordCorrect = await checkPassword(
    user.data.dataValues,
    body.password
  );

  if (!isPasswordCorrect)
    return {
      statusCode: statusCode.NOTFOUND,
      success: 0,
      message: responseMessage("password_invalid"),
    };

  let token;
  token = await generateToken({
    ...user.data.dataValues,
  })
  user.data.dataValues.token = token;
  return {
    statusCode: statusCode.SUCCESS,
    success: 1,
    message: responseMessage("user_logged"),
    data: { token: user.data.dataValues.token },
  };
}




