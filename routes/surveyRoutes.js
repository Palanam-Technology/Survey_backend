// routes/surveyRoutes.js
const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey'); 

router.post('/submit', async (req, res) => {
  try {
    const newSurvey = new Survey(req.body);
    await newSurvey.save();
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (err) {
    console.error('Survey submission error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
