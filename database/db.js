const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const { execute, fetchAll, fetchFirst } = require('./dbWrappers.js');

const dbPath = path.join(__dirname, 'clash.db');
const schemaPath = path.join(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath);
const schema = fs.readFileSync(schemaPath, 'utf-8');

// Runs at the start and creates the database from a schema
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
	try {
		const result = await fetchFirst(db, 'SELECT exists (SELECT * FROM clashDataCache WHERE id = $tournamentID ) AS tournamentExists', { $tournamentID: tournamentID });
		return Boolean(result.tournamentExists);
	}
	catch (error) {
		await saveError('tournamentExistsAsync,db.js', error);
	}
}
async function getTournamentData(tournamentID) {
	try {
		return await fetchFirst(db, `
    SELECT clashDataCache.nameKey,
           clashScheduleCache.registrationTime,
           clashScheduleCache.startTime
    FROM clashDataCache, clashScheduleCache
    WHERE clashDataCache.id = clashScheduleCache.idOfClash 
    AND clashDataCache.id = $tournamentID
`, { $tournamentID: tournamentID });
	}
	catch (error) {
		await saveError('getTournamentData,db.js', error);
	}
}
async function isUserSignedUpForNotifications(userID) {
	try {
		const result = await fetchFirst(db, 'SELECT exists (select userId from signeUpForNotifications WHERE userId = $userID) AS userSignedUp', { $userID: userID });
		return Boolean(result.userSignedUp);
	}
	catch (error) {
		await saveError('getTournamentData,db.js', error);
	}
}
async function signeUpForNotifications(userID) {
	try {
		await execute(db, 'INSERT INTO signeUpForNotifications (userId) values($userID)', { $userID: userID });
	}
	catch (error) {
		await saveError('signeUpForNotifications,db.js', error);
	}
	// db.run('INSERT INTO signeUpForNotifications (userId) values($userID)', { $userID: userID });
}
async function optOutForNotifications(userID) {
	try {
		await execute(db, 'DELETE FROM signeUpForNotifications WHERE userId = $userID', { $userID: userID });
	}
	catch (error) {
		await saveError('optOutForNotifications,db.js', error);
	}
}
async function signUpForTournament(userId, idOfClash) {
	try {
		await execute(db, 'INSERT INTO signUp (idOfClash, userId) VALUES ($idOfClash,$userId)', { $idOfClash:idOfClash, $userId:userId });
	}
	catch (error) {
		await saveError('signUpForTournament,db.js', error);
	}
}
async function optOutForTournament(userId, idOfClash) {
	try {
		await execute(db, 'DELETE FROM signUp WHERE idOfClash = $idOfClash AND userId = $userId', { $idOfClash: idOfClash, $userId: userId });
	}
	catch (error) {
		await saveError('optOutForTournament,db.js', error);
	}
}
async function getAllSubscribersAsync() {
	try {
		return await fetchAll(db, 'SELECT userId FROM signeUpForNotifications', { });
	}
	catch (error) {
		await saveError('getAllSubscribersAsync,db.js', error);
	}
}
async function saveError(location, errorMsg) {
	try {
		await execute(db, 'INSERT INTO errorInformation (location , errorMsg, time) VALUES ($location, $errorMsg, $time)', { $location: location,
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

module.exports = {
	dbCacheTournamentData,
	getTournamentData,
	getAllSubscribersAsync,
	signUpForTournament,
	optOutForTournament,
	saveError,
	tournamentExistsAsync,
	optOutForNotifications,
	isUserSignedUpForNotifications,
	signeUpForNotifications,
};
