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
function dbCacheTournamentData() {
	// TODO Add a trigger to the database that removes prev chached data
}
function getTournamentData() {
	// TODO what happens if no data exists
}
function signUpForTournament() {

}
function optOutForTournament() {

}
function isNotificationTimerSet() {
// Return true/fakse
}
function getStartTime(error) {

}
function saveError(error) {

}

module.exports = { dbCacheTournamentData, isNotificationTimerSet };
