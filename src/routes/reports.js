const express = require('express');
const controller = require("../controllers");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.post('/add_report_details', controller.reportsController.createReport);

router.get('/get_all_reports', controller.reportsController.getAllReports);

router.get('/get_report_by_id', controller.reportsController.getReportByID);

router.delete('/remove_report/:id', controller.reportsController.deleteReport);

router.put('/update_report', controller.reportsController.updateReport)

module.exports = router;