const db = require("../models/index");
const { Module, Session, } = db;
const common_api = require('../helpers/common_api')
const { responseMessage, } = require('../helpers/response');
const statusCode = require('../config/statusCode');

exports.createModule = async (body) => {
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
            category: body.category
        }
    }
    const isExisting = await common_api.getDataById(query, Module);
    if (isExisting.data || isExisting?.data?.deleted === 0) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("already_exists", "Module")
        };
    }
    const moduleData = await common_api.createData(body, Module);
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "Created", "Module"),
    };
}

exports.getAllModule = async () => {
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
    const get_all_data = await common_api.getAllData(query, Module);
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
            message: responseMessage("not_found", "Modules")
        }
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "getting", "Modules"),
        data: get_all_data.data,
    }
}

exports.getModuleByID = async (query_param) => {
    let query = {
        where: {
            module_id: query_param.module_id,
            deleted: 0
        },
        include: [
            {
                model: Session,
                attributes: ['session_id', 'name', 'reading_time', 'description'],
            }
        ],
    }
    const get_module_data = await common_api.getDataById(query, Module);
    if (get_module_data.error)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    else if (!get_module_data.data)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "Module"),
        };
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "getting", "Module"),
        data: get_module_data.data,
    };
}

exports.deleteModule = async (module_id) => {
    let query = {
        where: {
            module_id: module_id,
            deleted: 0
        }
    }
    const get_module_data = await common_api.getDataById(query, Module);

    if (get_module_data.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    }
    else if (!get_module_data.data) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "data"),
        };
    }

    const delete_module = await common_api.editData(query, { deleted: 1 }, Module)
    if (delete_module.error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "deleting"),
        };
    }
    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: responseMessage("success", "removed", "Module"),
    };
}

exports.updateModule = async (body) => {
    let query = {
        where: {
            module_id: body.module_id,
            deleted: 0
        },
    };
    const get_module_data = await common_api.getDataById(query, Module);
    if (get_module_data.error)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("error", "getting"),
        };
    else if (!get_module_data.data)
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: responseMessage("not_found", "Module"),
        };
    const update_module = await common_api.editData(query, body, Module)
    if (update_module.error) {
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