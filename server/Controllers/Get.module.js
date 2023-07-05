const express = require("express");
const axios = require("axios");
const GetRouter = express.Router();
const Record = require(".././Model/Record.model");
const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.API_KEY;
// Get all records
GetRouter.get("/image", async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
GetRouter.get("/ipinfo", async (req, res) => {
  try {
    const apiUrl = `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`;
    const response = await axios.get(apiUrl);
    const { country, city, state, latitude, longitude } = response.data;
    res.json({ success: true, country, city, state, latitude, longitude });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve geolocation information",
    });
  }
});
module.exports = GetRouter;