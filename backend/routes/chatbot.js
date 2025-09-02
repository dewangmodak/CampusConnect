// routes/chatbot.js
const express = require('express');
const { auth } = require('../middleware/auth');
// If you plan to use OpenAI, uncomment below and set OPENAI_API_KEY in env
// const OpenAI = require('openai');

const router = express.Router();

router.post('/ask', auth, async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: 'question is required' });

    // Simple local FAQ matching example (replace with OpenAI integration if you want)
    const lower = question.toLowerCase();
    if (lower.includes('event') || lower.includes('register')) {
      return res.json({ answer: 'You can view events on /api/events and register using /api/events/:id/register' });
    }
    if (lower.includes('post') || lower.includes('feed')) {
      return res.json({ answer: 'Go to the social feed and use the Create Post form. You can add text and an image.' });
    }

    // Placeholder fallback
    return res.json({ answer: "Sorry — I don't know that yet. Ask an admin to add more FAQs or integrate OpenAI." });

    /* Example OpenAI integration (optional):
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const gpt = await client.responses.create({
      model: 'gpt-4o-mini',
      input: `Answer concisely for campus FAQs: ${question}`
    });
    return res.json({ answer: gpt.output[0].content[0].text });
    */
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
