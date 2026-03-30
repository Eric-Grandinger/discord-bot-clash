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

function cacheTournamentInfo(tournaments) {
	for (let index = 0; index < tournaments.length; index++) {
		db.run('INSERT OR REPLACE INTO clashDataCache (id,themeId,nameKey) VALUES (?, ?, ?)', [
			tournaments[index].id,
			tournaments[index].themeId,
			tournaments[index].nameKey,
		]);
	}
}
function cacheTournamentSchedules(schedules) {
	for (let index = 0; index < schedules.length; index++) {
		db.run('INSERT OR REPLACE INTO clashScheduleCache (idOfClash,registrationTime,startTime,cancelled) VALUES (?, ?, ?, ?)', [
			schedules[index].id,
			schedules[index].registrationTime,
			schedules[index].startTime,
			schedules[index].cancelled,
		]);
	}
}
function dbCacheTournamentData(tournaments, schedules) {
	cacheTournamentInfo(tournaments);
	cacheTournamentSchedules(schedules);

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

function getSubscribedUser(userID) {

}
function getAllSubscribers() 

}
module.exports = { dbCacheTournamentData, isNotificationTimerSet };
