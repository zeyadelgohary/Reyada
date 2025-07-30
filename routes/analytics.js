const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/fetch-analyze", analyticsController.fetchAndAnalyze);

module.exports = router;
