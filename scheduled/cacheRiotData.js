const { getTournamentData } = require('../api/riotApi.js');
const { dbCacheTournamentData, tournamentExistsAsync, saveError } = require('../database/db.js');

async function cacheTurnamentData() {
	const result = await getTournamentData();
	const tournaments = [];
	const schedules = [];
	try {
		if (!result.success) return;
		if (!(await tournamentExistsAsync())) {
		// TODO send notification of upcoming event
		}
		for (const item of result.data) {
			const { schedule, ...tournament } = item;
			tournaments.push(tournament);
			schedules.push(...schedule);
		}
		console.log(tournaments);
		console.log(schedules);
		dbCacheTournamentData(tournaments, schedules);
	}
	catch (error) {
		saveError('In cacheTurnamentData', error);
	}
}
module.exports = { cacheTurnamentData };
