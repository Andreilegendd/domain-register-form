const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

const db = new sqlite3.Database('database.sqlite');

db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    surname TEXT,
    password TEXT,
    phone TEXT,
    email TEXT UNIQUE,
    domainData TEXT UNIQUE
    )
`);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/', (req, res) => {
    const { name, surname, password, phone, email, domainData } = req.body;

    db.run(
        `INSERT INTO users (name, surname, password, phone, email, domainData) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, surname, password, phone, email, domainData],
        function (err) {
            if (err) {
                console.error("Database insert error:", err);
                res.status(500).json({ success: false, message: "Error saving data to the database" });
            } else {
                console.log("User added:", req.body);
                res.status(201).json({ success: true, id: this.lastID, data: req.body });
            }
        }
    );
});

app.get('/admin', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            console.error("Database insert error:", err);
            res.status(500).json({ success: false, message: "Error saving data to the database" });
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`http://localhost:3000/`);
});