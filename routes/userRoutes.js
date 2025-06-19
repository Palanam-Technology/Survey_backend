const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { authenticateUser } = require('../controllers/authController');
const { isValidPhoneNumber, parsePhoneNumber } = require('libphonenumber-js');

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password, name, phone, address, country } = req.body;

  // Required fields 
  if (!email || !password || !name || !country) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  //  Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  //  Phone number validation (if provided, and for international formats)
const { isValidPhoneNumber, parsePhoneNumber } = require('libphonenumber-js');

if (phone) {
  try {
    const parsedPhone = parsePhoneNumber(phone);

    if (!parsedPhone.isValid()) {
      return res.status(400).json({ message: 'Invalid phone number format.' });
    }

    formData.phone = parsedPhone.number; // e.g., +919876543210
  } catch (err) {
    return res.status(400).json({ message: 'Invalid phone number format.' });
  }
}

 
  const username = name.toLowerCase().replace(/ /g, '');

  try {
   const existingUser = await User.findOne({ $or: [{ email }, { username }] });

if (existingUser) {
  if (existingUser.email === email) {
    return res.status(400).json({ message: 'Email already in use. Please use a different email.' });
  }
  if (existingUser.username === username) {
    return res.status(400).json({ message: 'Username already taken. Try a different name.' });
  }
}

    const newUser = new User({
      email,
      password,
      name,
      phone,
      address,
      country,
      username
    });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Server error', error: err.message || err });
  }
});

// Login route
router.post('/login', authenticateUser);
module.exports = router;

const crypto = require('crypto');
const nodemailer = require('nodemailer');


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

    await transporter.sendMail({
      to: user.email,
      from: 'your-email@gmail.com',
      subject: 'Reset Password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    });

    res.json({ message: 'Reset link sent to email.' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token.' });

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password successfully reset.' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});
