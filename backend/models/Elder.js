const mongoose = require("mongoose");

const elderSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  dob:    { type: String, required: true }, // keep as string (yyyy-mm-dd) from input
  gender: { type: String, required: true },
  elderCode: { type: String, unique: true }, // ELD001 etc.
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Elder", elderSchema);
