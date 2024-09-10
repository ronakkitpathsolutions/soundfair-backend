const db = require("../models/index");
const { User, Reports } = db;
const common_api = require('../helpers/common_api')
const { responseMessage, } = require('../helpers/response');
const statusCode = require('../config/statusCode');
const sequelize = require('../config/connection');
const { Op } = require('sequelize');

exports.createReport = async (body) => {
    if (Object.keys(body).length == 0) {
        return {
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: responseMessage('empty_body')
        };
    }
    let query = {
        where: {
            user_id: body.user_id,
            [Op.and]: sequelize.literal(`JSON_CONTAINS(report_data, '${JSON.stringify(body.report_data)}')`)
        }
    }
    const isExisting = await common_api.getDataById(query, Reports);
    if (isExisting.data || isExisting?.data?.deleted === 0) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("already_exists", "Same Report data of this User")
        };
    }
    const reportData = await common_api.createData(body, Reports);
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "Created", "Report Data"),
    };
}

exports.getAllReports = async () => {
    let query = {
        where: {
            deleted: 0
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            }
        ],
    }
    const get_all_data = await common_api.getAllData(query, Reports);
    if (get_all_data.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting")
        }
    }
    if (get_all_data.data && get_all_data.data.length === 0) {
        return {
            statusCode: statusCode.SUCCESS,
            success: 1,
            message: responseMessage("not_found", "Any Report Data")
        }
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "getting", "Report Data"),
        data: get_all_data.data,
    }
}

exports.getReportByID = async (query_param) => {
    let query = {
        where: {
            report_id: query_param.report_id,
            deleted: 0
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            }
        ],
    }
    const get_report_data = await common_api.getDataById(query, Reports);
    if (get_report_data.error)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    else if (!get_report_data.data)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "Report Data"),
        };
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "getting", "Report Data"),
        data: get_report_data.data,
    };
}

exports.deleteReport = async (report_id) => {
    let query = {
        where: {
            report_id: report_id,
            deleted: 0
        }
    }
    const get_report_data = await common_api.getDataById(query, Reports);

    if (get_report_data.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    }
    else if (!get_report_data.data) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "data"),
        };
    }

    const delete_report_data = await common_api.editData(query, { deleted: 1 }, Reports)
    if (delete_report_data.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "deleting"),
        };
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "removed", "Report Data"),
    };
}

exports.updateReport = async (body) => {
    let query = {
        where: {
            report_id: body.report_id,
            deleted: 0
        }
    }
    const get_report_data = await common_api.getDataById(query, Reports);
    if (get_report_data.error)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    else if (!get_report_data.data)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "Report Data"),
        };
    const update_report = await common_api.editData(query, body, Reports)
    if (update_report.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "updating"),
        };
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "Updated", "Report Data"),
    };
}