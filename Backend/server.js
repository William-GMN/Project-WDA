const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 8080;

const dbPath = path.join(__dirname, "stores.db");
const db = new sqlite3.Database(dbPath);

app.use(express.static(path.join(__dirname, "../Frontend")));

// API endpoint to get stores data
app.get("/api/stores", (req, res) => {
    const sql = "SELECT * FROM stores";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// Basic server setup
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/HTML/Home.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});