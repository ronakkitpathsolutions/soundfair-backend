const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Reports = sequelize.define('Reports', {
    report_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    report_data: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
})

module.exports = Reports;