const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  ID: String,
  TITLE: String,
  RESPONSIBLE_ID: String,
  RESPONSIBLE_NAME: String,
  RESPONSIBLE_LAST_NAME: String,
  STATUS: String,
  DEADLINE: String,
  CREATED_BY: String,
  CREATED_DATE: String,
  CLOSED_DATE: String,
  
});

module.exports = mongoose.model("Task", TaskSchema);
