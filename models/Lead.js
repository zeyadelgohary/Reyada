const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  ID: String,
  TITLE: String,
  STATUS_ID: String,
  DATE_CREATE: String,
  OPPORTUNITY: String,
});

module.exports = mongoose.model("Lead", LeadSchema);
