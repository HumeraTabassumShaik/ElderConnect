const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function callReminder(to, messageText) {
  await client.calls.create({
    twiml: `<Response><Say>${messageText}</Say></Response>`,
    to: to,
    from: process.env.TWILIO_PHONE
  });
}

module.exports = callReminder;
