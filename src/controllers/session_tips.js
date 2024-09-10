const { responseData, responseMessage } = require("../helpers/response");
const statusCode = require("../config/statusCode");
const service = require("../services")

exports.createSessionTips = async (req, res) => {
    try {
        const result = await service.sessionTipsService.createSessionTips(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "creating") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.getAllSessionTips = async (req, res) => {
    try {
        const result = await service.sessionTipsService.getAllSessionTips(req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "getting") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.getSessionTipByID = async (req, res) => {
    try {
        const result = await service.sessionTipsService.getSessionTipByID(req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "getting") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.deleteSessionTip = async (req, res) => {
    try {
        const result = await service.sessionTipsService.deleteSessionTip(req.params.id);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "removing") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.updateSessionTip = async (req, res) => {
    try {
        const result = await service.sessionTipsService.updateSessionTip(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "updating") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}