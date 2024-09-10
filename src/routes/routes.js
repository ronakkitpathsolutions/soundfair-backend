const express = require("express");
const router = express.Router();

// const users = require('./users')
const users = require('./user')
const modules = require('./module')
const session = require('./session')
const sessionTips = require('./session_tips')
const reports = require('./reports')

router.use(users);
router.use(modules);
router.use(session);
router.use(sessionTips);
router.use(reports);

module.exports = router;
