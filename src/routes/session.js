const express = require('express');
const controller = require("../controllers");
const router = express.Router();

router.post('/add_session', controller.sessionController.createSession);

router.get('/get_all_sessions', controller.sessionController.getAllSessions);

router.get('/get_session_by_id', controller.sessionController.getSessionById);

router.delete('/remove_session/:id', controller.sessionController.deleteSession);

router.put('/update_session', controller.sessionController.updateSession)

module.exports = router;