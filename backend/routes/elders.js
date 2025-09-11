const express = require("express");
const router = express.Router();
const Elder = require("../models/Elder");
const verifyAdmin = require("../middleware/auth");

// Generate elderCode like ELD001, ELD002...
async function generateElderCode() {
  const last = await Elder.findOne().sort({ createdAt: -1 }).lean();
  const lastNum = last?.elderCode?.match(/\d+$/)?.[0] || "0";
  const next = String(parseInt(lastNum) + 1).padStart(3, "0");
  return `ELD${next}`;
}

// POST /api/elders  (admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { name, dob, gender } = req.body;
    if (!name || !dob || !gender) return res.status(400).json({ msg: "Missing fields" });
    const elderCode = await generateElderCode();
    const elder = await Elder.create({ name, dob, gender, elderCode });
    res.json({ msg: "✅ Elder created", elder });
  } catch (err) {
    console.error("❌ Create elder:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/elders  (admin only)
router.get("/", verifyAdmin, async (_req, res) => {
  try {
    const elders = await Elder.find().sort({ createdAt: -1 }).lean();
    res.json(elders);
  } catch (err) {
    console.error("❌ Get elders:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
