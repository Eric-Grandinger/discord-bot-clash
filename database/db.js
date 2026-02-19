const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'clash.db');
const schemaPath = path.join(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath);
const schema = fs.readFileSync(schemaPath, 'utf-8');

db.exec(schema, (err) => {
	if (err) {
		console.error('Schema failed:', err);
	}
	else {
		console.log('Database created from schema');
	}
});
// const db = new sqlite3.Database('clash.db', sqlite3.OPEN_READWRITE, (err) => {
// if (err) return console.error(err.message);
// });
// TODO
// Conect to database
// Create the tables using scheme
// Create functions that construct queries
//    Retrice data
//    Add data
