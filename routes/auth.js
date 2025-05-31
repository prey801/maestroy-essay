const express = require('express');
const router = express.Router();

// Simulate database
const users = [];

router.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  // Check if user exists
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  // Save user
  const newUser = { firstName, lastName, email, password };
  users.push(newUser);

  res.status(201).json({ message: 'Signup successful!' });
});

module.exports = router;
