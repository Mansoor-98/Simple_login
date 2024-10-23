const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Default XAMPP has no password
    database: 'user_auth'  // We'll create this database
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;