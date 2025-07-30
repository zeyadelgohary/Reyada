const Expense = require("../models/Expense");

// Add new expense record
exports.addExpense = async (req, res) => {
  try {
    const { date, period, name, amount } = req.body;
    const total = parseFloat(amount) || 0;
    const expense = new Expense({ date, period, name, amount, total });
    await expense.save();
    res.status(201).json({ message: "Expense added successfully.", expense });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Failed to add expense." });
  }
};

// Edit expense record
exports.editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, period, name, amount } = req.body;
    const total = parseFloat(amount) || 0;
    const expense = await Expense.findByIdAndUpdate(id, { date, period, name, amount, total }, { new: true });
    if (!expense) return res.status(404).json({ error: "Expense not found." });
    res.status(200).json({ message: "Expense updated successfully.", expense });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Failed to update expense." });
  }
};

// Delete expense record
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ error: "Expense not found." });
    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Failed to delete expense." });
  }
};

// View history by date
exports.getExpensesByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const expenses = await Expense.find({ date: new Date(date) });
    res.status(200).json({ expenses });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Failed to fetch expenses." });
  }
};

// View all expenses (optionally filter by period)
exports.getExpenses = async (req, res) => {
  try {
    const { period } = req.query;
    const filter = period ? { period } : {};
    const expenses = await Expense.find(filter);
    res.status(200).json({ expenses });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Failed to fetch expenses." });
  }
};

// Calculations: totals
exports.getTotals = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    const totalByDay = {};
    const totalByMonth = {};
    const totalByYear = {};
    let grandTotal = 0;
    expenses.forEach(exp => {
      const day = exp.date.toISOString().substring(0, 10);
      const month = exp.date.toISOString().substring(0, 7);
      const year = exp.date.getFullYear();
      totalByDay[day] = (totalByDay[day] || 0) + exp.total;
      totalByMonth[month] = (totalByMonth[month] || 0) + exp.total;
      totalByYear[year] = (totalByYear[year] || 0) + exp.total;
      grandTotal += exp.total;
    });
    res.status(200).json({ totalByDay, totalByMonth, totalByYear, grandTotal });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Failed to calculate totals." });
  }
};
