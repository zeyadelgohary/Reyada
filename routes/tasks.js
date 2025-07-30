const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.get("/fetch-analyze", tasksController.fetchAndAnalyzeTasks);

module.exports = router;
