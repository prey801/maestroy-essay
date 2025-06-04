// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const stripe = require("stripe")("sk_test_51RWBUZPZNlyYsEkQMbPwkOHKgu1KPuNF7nytYDuVVvfaPDq7jiZyJ7bsvl3JegMiPHMjo4ECea0dvQbMZrLCDPje00UanDjTu1");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting for signup and login endpoints
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many signup attempts, please try again later.',
});
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts, please try again later.',
});
app.use('/api/signup', signupLimiter);
app.use('/api/login', loginLimiter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  marketing: { type: Boolean, default: false },
  agreedToTerms: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Assignment Schema
const Assignment = require('./models/Assignment');

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, PPT, PPTX allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Signup Route
app.post(
  '/api/signup',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/\d/).withMessage('Password must contain at least 1 number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least 1 special character'),
    body('agreedToTerms').isBoolean().equals('true').withMessage('You must agree to the Terms of Service'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }

      const { firstName, lastName, email, password, marketing, agreedToTerms } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        marketing,
        agreedToTerms,
      });

      await user.save();
      res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
      console.error('Signup error:', error);
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
      res.status(500).json({ error: 'Server error during signup.' });
    }
  }
);

// Login Route
app.post(
  '/api/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token, user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error during login.' });
    }
  }
);

// Assignment Submission Route
app.post(
  '/api/assignments',
  authenticateToken,
  upload.single('file'),
  [
    body('title').notEmpty().withMessage('Assignment title is required'),
    body('type').isIn(['essay', 'research', 'thesis', 'case', 'presentation']).withMessage('Invalid assignment type'),
    body('deadline').isISO8601().withMessage('Invalid deadline format'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }

      const { title, type, deadline } = req.body;
      const filePath = req.file ? req.file.path : null;

      if (!filePath) {
        return res.status(400).json({ error: 'File upload is required' });
      }

      const assignment = new Assignment({
        title,
        type,
        deadline,
        filePath,
        user: req.user.userId,
      });

      await assignment.save();
      res.status(201).json({ message: 'Assignment submitted successfully', assignment });
    } catch (error) {
      console.error('Assignment submission error:', error);
      res.status(500).json({ error: 'Server error during assignment submission.' });
    }
  }
);

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));