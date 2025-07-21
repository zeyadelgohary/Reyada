const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
  ID: {
    type: String,
    unique: true
  },
  TITLE: String,
  TYPE_ID: String,
  CATEGORY_ID: String,
  STAGE_ID: String,
  OPPORTUNITY: String,
  IS_MANUAL_OPPORTUNITY: {
    type: String,
    enum: ['Y', 'N']
  },
  ASSIGNED_BY_ID: String,
  DATE_CREATE: Date
});

module.exports = mongoose.model('Deal', DealSchema);
