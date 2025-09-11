const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config({ path: "./backend/.env" });

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const email = "admin@example.com";
    const password = "admin123"; // You can change this

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("🚫 Admin already exists");
      return;
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
