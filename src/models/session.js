const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Session = sequelize.define('Session', {
    session_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reading_time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
})

module.exports = Session;
