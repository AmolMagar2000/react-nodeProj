const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sept22',
  database: 'petShop',
});

// Check MySQL connection
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});


app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  
    connection.query(sql, [name, email, password], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.status(200).json({ success: true });
    });
  });
  
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  
    connection.query(sql, [email, password], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
