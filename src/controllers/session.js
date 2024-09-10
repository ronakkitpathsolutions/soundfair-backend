const { responseData, responseMessage } = require("../helpers/response");
const statusCode = require("../config/statusCode");
const service = require("../services")

exports.createSession = async (req, res) => {
    try {
        const result = await service.sessionService.createSession(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "creating") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.getAllSessions = async (req, res) => {
    try {
        const result = await service.sessionService.getAllSessions(req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "getting") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.getSessionById = async (req, res) => {
    try {
        const result = await service.sessionService.getSessionByID(req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "getting") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.deleteSession = async (req, res) => {
    try {
        const result = await service.sessionService.deleteSession(req.params.id, req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "removing") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.updateSession = async (req, res) => {
    try {
        const result = await service.sessionService.updateSession(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "updating") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}