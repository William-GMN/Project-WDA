const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const storesFilePath = path.join(__dirname, 'stores.json');
const storesData = JSON.parse(fs.readFileSync(storesFilePath, 'utf8'));

const db = new sqlite3.Database('stores.db');

function createDBFromJSON() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS stores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            url TEXT,
            district TEXT
        )`);

        const stmt = db.prepare(`INSERT INTO stores (name, url, district) VALUES (?, ?, ?)`);
        storesData.forEach(store => {
            stmt.run(store.name, store.url, store.district);
        });
        stmt.finalize();
    });

    db.close(err => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed.');
    });
}

module.exports = { createDBFromJSON }