const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
// 👇 load env from backend/.env
dotenv.config({ path: __dirname + '/.env' });

// 👇 confirm value loaded
console.log("ENV MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());
const reminderRoutes = require('./routes/reminders');
const healthLogRoutes = require('./routes/healthlog'); 
const adminAuthRoutes = require('./routes/adminAuth');
const elderRoutes     = require("./routes/elders");


app.use('/api/reminders', reminderRoutes);
app.use("/api/elders", elderRoutes);
app.use('/api/healthlog', healthLogRoutes);
app.use('/api/admin', adminAuthRoutes);

 // 💥 This allows cross-origin requests

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

