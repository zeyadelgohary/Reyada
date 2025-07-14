const axios = require("axios");
const Contact = require("../models/Contact");

const BITRIX_URL =
  "https://b24-0r8mng.bitrix24.com/rest/1/iolappou7w3kdu2w/crm.contact.list.json";

exports.fetchAndSaveContacts = async (req, res) => {
  try {
    
    const response = await axios.get(BITRIX_URL);
    const contacts = response.data.result;

    
    await Contact.deleteMany({});

    
    await Contact.insertMany(contacts);

    res.status(200).json({
      message: "Contacts fetched and saved successfully.",
      total: contacts.length,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch and save contacts." });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(contacts));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve contacts." });
  }
};

exports.addContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact added successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to add contact." });
  }
}
