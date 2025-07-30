const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  period: { type: String, enum: ["daily", "monthly", "yearly"], required: true },
  name: { type: String, required: true }, 
  amount: { type: Number, required: true }, 
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
