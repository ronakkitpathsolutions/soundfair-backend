const express = require('express');
const controller = require("../controllers");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth");


router.post('/add_module', verifyToken, verifyAdmin, controller.moduleController.createModule);

router.get('/get_all_modules', verifyToken, controller.moduleController.getAllModules);

router.get('/get_module_by_id', verifyToken, controller.moduleController.getModuleById);

router.delete('/remove_module/:id', verifyToken, verifyAdmin, controller.moduleController.deleteModule);

router.put('/update_module', verifyToken, verifyAdmin, controller.moduleController.updateModule)
module.exports = router;