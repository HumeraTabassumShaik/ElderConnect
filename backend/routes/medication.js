const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

// POST a new reminder
router.post('/', async (req, res) => {
  try {
    const newReminder = new Reminder(req.body);
    await newReminder.save();
    res.status(201).json({ message: 'Reminder saved successfully!' });
  } catch (error) {
    console.error('❌ Error saving reminder:', error);
    res.status(500).json({ error: 'Server error while saving reminder.' });
  }
});

// GET all reminders
router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
});

module.exports = router;
