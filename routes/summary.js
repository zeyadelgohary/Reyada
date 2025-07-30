const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summaryController");

router.get("/dashboard", summaryController.getDashboardSummary);

module.exports = router;
