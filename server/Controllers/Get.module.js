const express = require("express");
const GetRouter = express.Router();
const Record = require(".././Model/Record.model");

// Get all records
GetRouter.get("/image", async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = GetRouter;
