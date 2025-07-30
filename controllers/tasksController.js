const axios = require("axios");
const Task = require("../models/Task");

const BITRIX_TASKS_URL = "https://b24-0r8mng.bitrix24.com/rest/1/vww504i93uiu0scn/task.item.list";

function getStatus(task) {
  // Bitrix24 status codes: 5 = completed, 4 = overdue, 2 = pending (new), 3 = in progress
  if (task.STATUS === "5") return "completed";
  if (task.STATUS === "4") return "overdue";
  if (task.STATUS === "2" || task.STATUS === "3") return "pending";
  return "other";
}

exports.fetchAndAnalyzeTasks = async (req, res) => {
  try {
    // Fetch tasks
    const response = await axios.get(BITRIX_TASKS_URL);
    const tasks = response.data.result || [];

    // Save to DB 
    await Task.deleteMany({});
    await Task.insertMany(tasks);

    // Group by user
    const userStats = {};
    tasks.forEach(task => {
      const userId = task.RESPONSIBLE_ID;
      if (!userStats[userId]) {
        userStats[userId] = {
          total: 0,
          completed: 0,
          overdue: 0,
          pending: 0,
          name: task.RESPONSIBLE_NAME || userId 
        };
      }
      userStats[userId].total++;
      const status = getStatus(task);
      if (status === "completed") userStats[userId].completed++;
      if (status === "overdue") userStats[userId].overdue++;
      if (status === "pending") userStats[userId].pending++;
    });

    // Calculate percentages
    Object.values(userStats).forEach(stat => {
      stat.completionRate = stat.total > 0 ? (stat.completed / stat.total) * 100 : 0;
      stat.overdueRate = stat.total > 0 ? (stat.overdue / stat.total) * 100 : 0;
    });

    // Prepare data for charts and summary
    const chartData = Object.keys(userStats).map(userId => ({
      userId,
      name: userStats[userId].name,
      completed: userStats[userId].completed,
      overdue: userStats[userId].overdue,
      pending: userStats[userId].pending,
      completionRate: userStats[userId].completionRate,
      overdueRate: userStats[userId].overdueRate
    }));
    const summaryTable = chartData;

    res.status(200).json({
      chartData,
      summaryTable
    });
  } catch (err) {
    console.error(err.message);
    res.status(503).json({ error: "Failed to fetch and analyze tasks." });
  }
};
