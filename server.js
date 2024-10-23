const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Register endpoint
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(query, [username, password, email], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error registering user' });
            return;
        }
        res.json({ message: 'User registered successfully' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err || results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        res.json({ message: 'Login successful' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});