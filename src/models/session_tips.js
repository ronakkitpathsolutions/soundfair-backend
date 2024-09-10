const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Session_tips = sequelize.define('Session_tips', {
    tip_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    details: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
})

module.exports = Session_tips;