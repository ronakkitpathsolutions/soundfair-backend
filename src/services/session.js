// const Session = require('../models/session');
const db = require("../models/index");
const { Module, Session, } = db;
const common_api = require('../helpers/common_api')
const { responseMessage, } = require('../helpers/response');
const statusCode = require('../config/statusCode');

exports.createSession = async (body) => {
    if (Object.keys(body).length == 0) {
        return {
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: responseMessage('empty_body')
        };
    }
    let query = {
        where:
        {
            name: body.name,
            module_id: body.module_id
        }
    }
    const isExisting = await common_api.getDataById(query, Session);
    if (isExisting.data || isExisting?.data?.deleted === 0) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("already_exists", "Session")
        };
    }
    const sessionData = await common_api.createData(body, Session);
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "Created", "Session"),
    };
}

exports.getAllSessions = async () => {
    let query = {
        where: {
            deleted: 0
        },
        include: [
            {
                model: Module,
                attributes: ['module_id', 'name', 'category'],
            }
        ],
    }
    const get_all_data = await common_api.getAllData(query, Session);
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
            message: responseMessage("not_found", "Sessions")
        }
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "getting", "Sessions"),
        data: get_all_data.data,
    }

}

exports.getSessionByID = async (query_param) => {
    let query = {
        where: {
            session_id: query_param.session_id,
            deleted: 0
        },
        include: [
            {
                model: Module,
                attributes: ['module_id', 'name', 'category'],
            }
        ],
    }
    const get_session_data = await common_api.getDataById(query, Session);
    if (get_session_data.error)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    else if (!get_session_data.data)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "Session"),
        };
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "getting", "Session"),
        data: get_session_data.data,
    };

}

exports.deleteSession = async (session_id) => {
    let query = {
        where: {
            session_id: session_id,
            deleted: 0
        }
    }
    const get_session_data = await common_api.getDataById(query, Session);

    if (get_session_data.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    }
    else if (!get_session_data.data) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "data"),
        };
    }

    const delete_session = await common_api.editData(query, { deleted: 1 }, Session)
    if (delete_session.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "deleting"),
        };
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "removed", "Session"),
    };
}

exports.updateSession = async (body) => {
    let query = {
        where: {
            session_id: body.session_id,
            deleted: 0
        },
    };
    const get_session_data = await common_api.getDataById(query, Session);
    if (get_session_data.error)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    else if (!get_session_data.data)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "Session"),
        };
    const update_session = await common_api.editData(query, body, Session)
    if (update_session.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "updating"),
        };
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "Updated", "Session"),
    };
}