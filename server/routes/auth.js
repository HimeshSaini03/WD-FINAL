// Backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// // Signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
//     const user = new User({ username, email, password });
//     await user.save();
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(201).json({ token, authority: user.authority });
//   } catch (error) {
//     res.status(500).json({ error: 'Error registering user' });
//   }
// });
// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, authority } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      authority: authority || 'user', // Default to 'user' if authority is not provided
    });

    await user.save();

    const token = jwt.sign({ id: user._id, authority: user.authority }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, authority: user.authority });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, authority: user.authority });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;