// routes/events.js
const express = require('express');
const { auth, requireAdmin } = require('../middleware/auth');
const Event = require('../models/Event');

const router = express.Router();

// Create event (admin)
router.post('/', auth, requireAdmin, async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    const event = new Event({ title, description, date, location, capacity, createdBy: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List events
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register for event
router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Prevent duplicates
    if (event.participants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    if (event.capacity && event.participants.length >= event.capacity) {
      return res.status(400).json({ message: 'Event full' });
    }

    event.participants.push(req.user.id);
    await event.save();
    res.json({ message: 'Registered', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unregister
router.post('/:id/unregister', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.participants = event.participants.filter(p => String(p) !== String(req.user.id));
    await event.save();
    res.json({ message: 'Unregistered', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
