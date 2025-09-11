const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "elder_secret";

// POST /api/admin/login (admin only)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

module.exports = router;
