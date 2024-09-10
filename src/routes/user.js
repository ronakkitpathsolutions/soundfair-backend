const express = require('express');
const controller = require("../controllers");
const router = express.Router();


router.post('/register', controller.userController.registerUser);
router.post('/login', controller.userController.loginUser);


module.exports = router;