const mongoose = require("mongoose");

const healthLogSchema = new mongoose.Schema({
  elderId:    { type: mongoose.Schema.Types.ObjectId, ref: "Elder", required: true },
  date:       { type: Date, required: true }, // normalized to start-of-day (local)
  bp:         { type: String, required: true },   // "120/80"
  sugar:      { type: Number, required: true },
  temperature:{ type: Number, required: true },
  notes:      { type: String }
}, { timestamps: true });

// Unique per elder per calendar day
healthLogSchema.index({ elderId: 1, date: 1 }, { unique: true });

// Normalize incoming date to 00:00:00 local time
function normalizeDay(d) {
  const dt = new Date(d || Date.now());
  dt.setHours(0,0,0,0);
  return dt;
}

healthLogSchema.pre("validate", function(next) {
  this.date = normalizeDay(this.date);
  next();
});

module.exports = mongoose.model("HealthLog", healthLogSchema);
