const { responseData, responseMessage } = require("../helpers/response");
const statusCode = require("../config/statusCode");
const service = require("../services")

exports.registerUser = async (req, res) => {
    try {
        const result = await service.UserService.registerUser(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "creating") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const result = await service.UserService.loginUser(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("wrong") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}
