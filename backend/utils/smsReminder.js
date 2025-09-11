// backend/utils/smsReminder.js
const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to
    });
    console.log(`✅ SMS sent to ${to}`);
  } catch (err) {
    console.error(`❌ Error sending SMS to ${to}`, err.message);
  }
};

module.exports = sendSMS;
