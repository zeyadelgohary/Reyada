const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");


router.get("/fetch-bitrix", contactController.fetchAndSaveContacts);
router.get("/", contactController.getContacts);
router.post("/add", contactController.addContact);
module.exports = router;
