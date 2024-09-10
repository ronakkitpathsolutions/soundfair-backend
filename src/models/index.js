const sequelize = require('../config/connection');
const User = require('./user');
const Module = require('./modules');
const Session = require('./session');
const Session_tips = require('./session_tips');
const Reports = require('./report');


const db = {
    User,
    Module,
    Session,
    Session_tips,
    Reports,
    sequelize,
};


db.Module.hasMany(db.Session, { foreignKey: "module_id", onDelete: 'cascade', allowNull: false });
db.Session.belongsTo(db.Module, { foreignKey: "module_id" });


db.Session.hasMany(db.Session_tips, { foreignKey: "session_id", onDelete: 'cascade', allowNull: false });
db.Session_tips.belongsTo(db.Session, { foreignKey: "session_id" });


db.User.hasMany(db.Reports, { foreignKey: 'user_id', onDelete: 'cascade', allowNull: false });
db.Reports.belongsTo(db.User, { foreignKey: 'user_id' });


module.exports = db;
