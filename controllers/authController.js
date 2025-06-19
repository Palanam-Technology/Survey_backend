//Logic for backend handling of LoginModal.js
const User = require('../models/User');  

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password stored in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with a dummy token
    return res.status(200).json({ message: 'Login successful', token: 'your-token-here' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message || err });
  }
};

module.exports = { authenticateUser };