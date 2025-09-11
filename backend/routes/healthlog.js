const express = require("express");
const router = express.Router();
const HealthLog = require("../models/HealthLog");
const verifyAdmin = require("../middleware/auth");

// Normalize day window
function dayRange(dateStr) {
  const start = new Date(dateStr);
  start.setHours(0,0,0,0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

// ✅ GET last 30 logs for an elder
router.get("/:elderId", verifyAdmin, async (req, res) => {
  try {
    const { elderId } = req.params;
    const { date } = req.query;

    // If date is provided, return that specific day's log (or empty)
    if (date) {
      const { start, end } = dayRange(date);
      const one = await HealthLog.findOne({
        elderId,
        date: { $gte: start, $lt: end }
      }).lean();
      return res.json(one || {});
    }

    // Otherwise return latest 30
    const logs = await HealthLog.find({ elderId })
      .sort({ date: -1 })
      .limit(30)
      .lean();
    res.json(logs);
  } catch (err) {
    console.error("❌ Fetch logs:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ POST create a log (duplicate day -> 409)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { elderId, date, bp, sugar, temperature, notes } = req.body;
    if (!elderId || !date || !bp || sugar == null || temperature == null) {
      return res.status(400).json({ msg: "Missing fields" });
    }
    try {
      const created = await HealthLog.create({ elderId, date, bp, sugar, temperature, notes });
      return res.json({ msg: "✅ Log saved", log: created });
    } catch (e) {
      if (e.code === 11000) {
        return res.status(409).json({ msg: "Log already exists for this date" });
      }
      throw e;
    }
  } catch (err) {
    console.error("❌ Create log:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ PUT update an existing log by _id
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await HealthLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "✅ Log updated", log: updated });
  } catch (err) {
    console.error("❌ Update log:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
