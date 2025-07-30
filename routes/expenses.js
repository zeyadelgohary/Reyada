const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/add", expenseController.addExpense);
router.put("/edit/:id", expenseController.editExpense);
router.delete("/delete/:id", expenseController.deleteExpense);
router.get("/by-date", expenseController.getExpensesByDate);
router.get("/", expenseController.getExpenses);
router.get("/totals", expenseController.getTotals);

module.exports = router;
