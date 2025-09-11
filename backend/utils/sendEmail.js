const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: './backend/.env' });

const sendEmail = async (to, subject, text) => {
  try {
    console.log("📤 Sending to:", to);
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ElderConnect 👵👴" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw err;
  }
};

module.exports = sendEmail;
