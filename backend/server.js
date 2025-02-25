const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your-secret-key'; // Replace with a secure key

// Middleware to authenticate JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Register User
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash],
    function (err) {
      if (err) return res.status(400).json({ message: 'Email already exists' });
      res.json({ id: this.lastID, name, email });
    }
  );
});

// Login User
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
    res.json({ token });
  });
});

// Create Bot
app.post('/bots', authenticate, (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  db.run(
    'INSERT INTO bots (name, description, user_id) VALUES (?, ?, ?)',
    [name, description, userId],
    function (err) {
      if (err) return res.status(500).json({ message: 'Failed to create bot' });
      res.json({ id: this.lastID, name, description });
    }
  );
});

// Upload Training Data
app.post('/bots/:botId/training-data', authenticate, (req, res) => {
  const { botId } = req.params;
  const trainingData = req.body;

  const stmt = db.prepare('INSERT INTO training_data (bot_id, question, answer) VALUES (?, ?, ?)');
  trainingData.forEach((item) => {
    stmt.run(botId, item.question, item.answer);
  });
  stmt.finalize();

  res.json({ message: 'Training data uploaded successfully' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});