const axios = require("axios");
const Deal = require("../models/Deal");

const BITRIX_URL =
  "https://b24-0r8mng.bitrix24.com/rest/1/iolappou7w3kdu2w/crm.deal.list?filter[STAGE_ID]=UC_3MCI1C&select[]=ID&select[]=TITLE&select[]=TYPE_ID&select[]=CATEGORY_ID&select[]=STAGE_ID&select[]=OPPORTUNITY&select[]=IS_MANUAL_OPPORTUNITY&select[]=ASSIGNED_BY_ID&select[]=DATE_CREATE";


exports.fetchAndSaveDeals = async (req, res) => {
  try {
    const response = await axios.get(BITRIX_URL);
    const deals = response.data.result;

    await Deal.deleteMany({});
    await Deal.insertMany(deals);

    res.status(200).json({
      message: "Deals fetched and saved successfully.",
      total: deals.length,
    });
  } catch (err) {
    console.error(err.message);
    res.status(503).json({ error: "Failed to fetch and save deals." });
  }
}


exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find({});
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(deals));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve deals." });
  }
}