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

function dbCacheTournamentData(tournaments, schedules) {
	cacheTournamentInfo(tournaments);
	cacheTournamentSchedules(schedules);
}
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
// https://github.com/TryGhost/node-sqlite3/wiki/Api#databaserunsql-param--callback
async function tournamentExistsAsync(tournamentID) {
	const result = db.get('SELECT exists (SELECT * FROM clashDataCache WHERE id = $tournamentID ) AS tournamentExists', { $tournamentID: tournamentID });
	return result.tournamentExists;
}
async function getTournamentData(tournamentID) {
	// TODO what happens if no data exists
}
function signUpForTournament(userId, idOfClash) {

}
function optOutForTournament(userId, idOfClash) {
	// should i get the latest or should it be accessed by id?
}
async function saveError(location, errorMsg) {
	try {
		await db.run('INSERT INTO errorInformation (location , errorMsg, time) VALUES ($location, $errorMsg, $time)',
			{ $location: location,
				$errorMsg: errorMsg.message ?? String(errorMsg),
				$time: new Date().toLocaleString(),
			});
		console.log(location + ' ' + errorMsg.message);
	}
	catch (error) {
		console.log('original error' + errorMsg + ' location ' + location);
		console.log('New error ' + error);
	}
}

function getSubscribedUser(userID, idOfClash) {

}
async function getAllSubscribersAsync() {
	// Return a list of all the subscribers who want to get updates
}
module.exports = {
	dbCacheTournamentData,
	getTournamentData,
	getStartTimeAsync,
	getAllSubscribersAsync,
	getSubscribedUser,
	signUpForTournament,
	optOutForTournament,
	saveError,
	tournamentExistsAsync,
};
