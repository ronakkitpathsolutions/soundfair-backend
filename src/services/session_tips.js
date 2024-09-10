const db = require("../models/index");
const { Module, Session, Session_tips } = db;
const common_api = require('../helpers/common_api')
const { responseMessage, } = require('../helpers/response');
const statusCode = require('../config/statusCode');


exports.createSessionTips = async (body) => {
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
            details: body.details,
            session_id: body.session_id
        }
    }
    const isExisting = await common_api.getDataById(query, Session_tips);
    if (isExisting.data || isExisting?.data?.deleted === 0) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("already_exists", "Session Tip")
        };
    }
    const TipsData = await common_api.createData(body, Session_tips);
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "Created", "Session Tip"),
    };
}

exports.getAllSessionTips = async () => {
    let query = {
        where: {
            deleted: 0
        },
        include: [
            {
                model: Session,
                attributes: ['session_id', 'name', 'reading_time', 'description'],
            }
        ],
    }
    const get_all_data = await common_api.getAllData(query, Session_tips);
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
            message: responseMessage("not_found", "Session Tips")
        }
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "getting", "Session Tips"),
        data: get_all_data.data,
    }

}

exports.getSessionTipByID = async (query_param) => {
    let query = {
        where: {
            tip_id: query_param.tip_id,
            deleted: 0
        },
        include: [
            {
                model: Session,
                attributes: ['session_id', 'name', 'reading_time', 'description'],
            }
        ],
    }
    const get_tips_data = await common_api.getDataById(query, Session_tips);
    if (get_tips_data.error)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    else if (!get_tips_data.data)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "Session Tip"),
        };
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "getting", "Session Tip"),
        data: get_tips_data.data,
    };
}

exports.deleteSessionTip = async (tip_id) => {
    let query = {
        where: {
            tip_id: tip_id,
            deleted: 0
        }
    }
    const get_tip_data = await common_api.getDataById(query, Session_tips);

    if (get_tip_data.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    }
    else if (!get_tip_data.data) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "data"),
        };
    }

    const delete_session_tip = await common_api.editData(query, { deleted: 1 }, Session_tips)
    if (delete_session_tip.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "deleting"),
        };
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "removed", "Session Tip"),
    };
}

exports.updateSessionTip = async (body) => {
    let query = {
        where: {
            tip_id: body.tip_id,
            deleted: 0
        },
    };
    const get_tip_data = await common_api.getDataById(query, Session_tips);
    if (get_tip_data.error)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    else if (!get_tip_data.data)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "Session Tip"),
        };
    const update_session_tip = await common_api.editData(query, body, Session_tips)
    if (update_session_tip.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "updating"),
        };
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "Updated", "Module"),
    };
}