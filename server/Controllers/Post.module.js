const express = require("express");
const PostRouter = express.Router();
const Record = require("../Model/Record.model");

// Create a new record
PostRouter.post("/image", async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = PostRouter;
