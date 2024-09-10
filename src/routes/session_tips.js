const express = require('express');
const controller = require("../controllers");
const router = express.Router();

router.post('/add_session_tips', controller.sessionTipsController.createSessionTips);

router.get('/get_all_session_tips', controller.sessionTipsController.getAllSessionTips);

router.get('/get_session_tip_by_id', controller.sessionTipsController.getSessionTipByID);

router.delete('/remove_session_tip/:id', controller.sessionTipsController.deleteSessionTip);

router.put('/update_session_tip', controller.sessionTipsController.updateSessionTip)

module.exports = router;