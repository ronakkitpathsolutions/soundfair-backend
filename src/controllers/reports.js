const { responseData, responseMessage } = require("../helpers/response");
const statusCode = require("../config/statusCode");
const service = require("../services")

exports.createReport = async (req, res) => {
    try {
        const result = await service.reportsService.createReport(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "creating") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.getAllReports = async (req, res) => {
    try {
        const result = await service.reportsService.getAllReports(req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "getting") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.getReportByID = async (req, res) => {
    try {
        const result = await service.reportsService.getReportByID(req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "getting") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.deleteReport = async (req, res) => {
    try {
        const result = await service.reportsService.deleteReport(req.params.id, req.query);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "removing") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}

exports.updateReport = async (req, res) => {
    try {
        const result = await service.reportsService.updateReport(req.body);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("error", "updating") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}