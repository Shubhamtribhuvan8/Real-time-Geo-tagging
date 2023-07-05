const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
