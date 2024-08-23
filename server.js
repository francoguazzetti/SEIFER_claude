const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const pool = mysql.createPool({
    host: 'YOUR_CLOUD_SQL_HOST',
    user: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
    database: 'YOUR_DATABASE',
    port: 3306,
});

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Add a new marker
app.post('/api/markers', async (req, res) => {
    const { address, description, latitude, longitude } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO markers (address, description, latitude, longitude) VALUES (?, ?, ?, ?)',
            [address, description, latitude, longitude]
        );
        res.status(201).json({ id: result.insertId, address, description, latitude, longitude });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all markers
app.get('/api/markers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM markers');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});