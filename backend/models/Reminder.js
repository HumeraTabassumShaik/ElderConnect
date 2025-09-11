const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["call", "sms", "email"], required: true },
  dateTime: { type: Date, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" }
});

module.exports = mongoose.model("Reminder", reminderSchema);
