const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Module = sequelize.define('Module', {
    module_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM,
        values: ['Relationships', 'Confidence', 'Stigma', 'Identity', 'Loneliness', 'Communicating needs', 'Loss', 'Acceptance', 'Anxiety', 'Low mood'],
        allowNull: false,
    },
    deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
})

module.exports = Module;