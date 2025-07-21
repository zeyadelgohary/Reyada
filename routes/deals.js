const express = require("express");
const router = express.Router();
const dealsController = require("../controllers/dealsController");


router.get("/fetch-bitrix",dealsController.fetchAndSaveDeals);
router.get("/", dealsController.getDeals);
module.exports = router;
