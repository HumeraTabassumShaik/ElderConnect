const frequencySelect = document.getElementById('frequency');
const customDaysDiv = document.getElementById('customDays');
const emailField = document.getElementById('emailField'); // for showing/hiding email input

frequencySelect.addEventListener('change', () => {
  if (frequencySelect.value === 'custom') {
    customDaysDiv.style.display = 'block';
  } else {
    customDaysDiv.style.display = 'none';
  }
});

// Handle type selection changes (Call / SMS / Email)
document.getElementById("reminderType").addEventListener("change", (e) => {
  const btn = document.getElementById("sendBtn");

  // Update button text
  if (e.target.value === "sms") {
    btn.innerText = "💬 Send SMS";
    emailField.style.display = "none";
  } else if (e.target.value === "email") {
    btn.innerText = "📧 Send Email";
    emailField.style.display = "block";
  } else {
    btn.innerText = "📞 Send Call";
    emailField.style.display = "none";
  }
});

document.getElementById('reminderForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  const frequency = frequencySelect.value;
  const reminderType = document.getElementById('reminderType').value;
  const reminderTime = document.getElementById('reminderTime').value;
  const email = document.getElementById('email')?.value || null;

  const today = new Date().toISOString().split('T')[0];
  const dateTime = `${today}T${reminderTime}`;

  let customDays = [];
  if (frequency === 'custom') {
    customDays = Array.from(customDaysDiv.querySelectorAll('input:checked')).map(cb => cb.value);
  }

  const body = {
    name,
    phone,
    message,
    frequency,
    customDays,
    type: reminderType,     // call | sms | email
    category: "medication", // fixed
    dateTime,
    email                 // 👈 include only if provided
  };

  try {
    const res = await fetch('http://localhost:5000/api/reminders/call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById('statusMsg').innerText = data.msg || "Reminder sent!";
  } catch (err) {
    console.error(err);
    document.getElementById('statusMsg').innerText = "❌ Error sending reminder.";
  }
});

