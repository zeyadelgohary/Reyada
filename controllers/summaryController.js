const Deal = require("../models/Deal");
const Expense = require("../models/Expense");

// GET /api/summary/dashboard?month=YYYY-MM&year=YYYY
exports.getDashboardSummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    let dealFilter = {};
    let expenseFilter = {};
    if (month) {
      dealFilter["DATE_CREATE"] = { $gte: new Date(month + "-01"), $lt: new Date(month + "-31") };
      expenseFilter["date"] = { $gte: new Date(month + "-01"), $lt: new Date(month + "-31") };
    } else if (year) {
      dealFilter["DATE_CREATE"] = { $gte: new Date(year + "-01-01"), $lt: new Date(year + "-12-31") };
      expenseFilter["date"] = { $gte: new Date(year + "-01-01"), $lt: new Date(year + "-12-31") };
    }

    // Income: sum of OPPORTUNITY for all deals
    const deals = await Deal.find(dealFilter);
    const monthlyIncome = {};
    let totalIncome = 0;
    deals.forEach(deal => {
      const monthKey = deal.DATE_CREATE ? deal.DATE_CREATE.toISOString().substring(0,7) : "unknown";
      const value = parseFloat(deal.OPPORTUNITY) || 0;
      monthlyIncome[monthKey] = (monthlyIncome[monthKey] || 0) + value;
      totalIncome += value;
    });

    // Expenses: sum of total for all expenses
    const expenses = await Expense.find(expenseFilter);
    const monthlyExpenses = {};
    let totalExpenses = 0;
    expenses.forEach(exp => {
      const monthKey = exp.date ? exp.date.toISOString().substring(0,7) : "unknown";
      monthlyExpenses[monthKey] = (monthlyExpenses[monthKey] || 0) + exp.total;
      totalExpenses += exp.total;
    });

    // Net profit per month
    const netProfit = {};
    const allMonths = Array.from(new Set([...Object.keys(monthlyIncome), ...Object.keys(monthlyExpenses)]));
    allMonths.forEach(monthKey => {
      netProfit[monthKey] = (monthlyIncome[monthKey] || 0) - (monthlyExpenses[monthKey] || 0);
    });

    // Prepare chart data
    const incomeBar = allMonths.map(monthKey => ({ month: monthKey, income: monthlyIncome[monthKey] || 0 }));
    const expenseBar = allMonths.map(monthKey => ({ month: monthKey, expense: monthlyExpenses[monthKey] || 0 }));
    const profitLine = allMonths.map(monthKey => ({ month: monthKey, profit: netProfit[monthKey] || 0 }));

    res.status(200).json({
      totalIncome,
      totalExpenses,
      netProfitTotal: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      netProfit,
      incomeBar,
      expenseBar,
      profitLine
    });
  } catch (err) {
    console.error(err.message);
    res.status(503).json({ error: "Failed to fetch summary dashboard." });
  }
};
