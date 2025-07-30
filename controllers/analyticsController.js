const axios = require("axios");
const Lead = require("../models/Lead");
const Deal = require("../models/Deal");

const BITRIX_LEADS_URL = "https://b24-0r8mng.bitrix24.com/rest/1/iolappou7w3kdu2w/crm.lead.list.json";
const BITRIX_DEALS_URL = "https://b24-0r8mng.bitrix24.com/rest/1/iolappou7w3kdu2w/crm.deal.list.json";

exports.fetchAndAnalyze = async (req, res) => {
  try {
    // Fetch leads
    const leadsResponse = await axios.get(BITRIX_LEADS_URL);
    const leads = leadsResponse.data.result || [];
    // Fetch deals
    const dealsResponse = await axios.get(BITRIX_DEALS_URL);
    const deals = dealsResponse.data.result || [];

    // Save to DB 
     await Lead.deleteMany({});
     await Lead.insertMany(leads);
     await Deal.deleteMany({});
     await Deal.insertMany(deals);

    // Calculate metrics
    const totalLeads = leads.length;
    const totalDeals = deals.length;
    const wonDeals = deals.filter(d => d.STAGE_ID === "WON");
    const totalWonValue = wonDeals.reduce((sum, d) => sum + (parseFloat(d.OPPORTUNITY) || 0), 0);
    const conversionRate = totalLeads > 0 ? (totalDeals / totalLeads) * 100 : 0;

    // Monthly breakdown
    const monthlyStats = {};
    leads.forEach(lead => {
      const month = lead.DATE_CREATE ? lead.DATE_CREATE.substring(0,7) : "unknown";
      if (!monthlyStats[month]) monthlyStats[month] = { leads: 0, deals: 0, wonValue: 0 };
      monthlyStats[month].leads++;
    });
    deals.forEach(deal => {
      const month = deal.DATE_CREATE ? deal.DATE_CREATE.substring(0,7) : "unknown";
      if (!monthlyStats[month]) monthlyStats[month] = { leads: 0, deals: 0, wonValue: 0 };
      monthlyStats[month].deals++;
      if (deal.STAGE_ID === "WON") {
        monthlyStats[month].wonValue += parseFloat(deal.OPPORTUNITY) || 0;
      }
    });

    // Prepare data for charts
    const pieData = {
      leads: totalLeads,
      deals: totalDeals
    };
    const lineData = Object.keys(monthlyStats).map(month => ({
      month,
      conversion: monthlyStats[month].leads > 0 ? (monthlyStats[month].deals / monthlyStats[month].leads) * 100 : 0
    }));
    const barData = Object.keys(monthlyStats).map(month => ({
      month,
      income: monthlyStats[month].wonValue
    }));

    res.status(200).json({
      totalLeads,
      totalDeals,
      totalWonValue,
      conversionRate,
      monthlyStats,
      pieData,
      lineData,
      barData
    });
  } catch (err) {
    console.error(err.message);
    res.status(503).json({ error: "Failed to fetch and analyze data." });
  }
};
