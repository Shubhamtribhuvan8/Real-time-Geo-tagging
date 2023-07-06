const express = require("express");
const axios = require("axios");
const GetRouter = express.Router();
const Record = require(".././Model/Record.model");
const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.API_KEY;
// Get all records
// GetRouter.get("/image", async (req, res) => {
//   try {
//     const records = await Record.find();
//     res.json(records);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
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
GetRouter.get("/image", async (req, res) => {
  try {
    const filter = req.query.filter;

    let filteredLocations;
    if (filter && filter !== "filter") {
      filteredLocations = await Record.find({ locationame: filter });
    } else {
      filteredLocations = await Record.find();
    }

    res.json(filteredLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
GetRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findByIdAndRemove(id);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = GetRouter;
