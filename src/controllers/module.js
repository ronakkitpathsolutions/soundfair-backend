const { responseData, responseMessage } = require("../helpers/response");
const statusCode = require("../config/statusCode");
const service = require("../services")

exports.createModule = async (req, res) => {
    try {
        const result = await service.ModuleService.createModule(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "creating") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.getAllModules = async (req, res) => {
    try {
        const result = await service.ModuleService.getAllModule(req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "getting") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.getModuleById = async (req, res) => {
    try {
        const result = await service.ModuleService.getModuleByID(req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "getting") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.deleteModule = async (req, res) => {
    try {
        const result = await service.ModuleService.deleteModule(req.params.id, req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "removing") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.updateModule = async (req, res) => {
    try {
        const result = await service.ModuleService.updateModule(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "updating") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}