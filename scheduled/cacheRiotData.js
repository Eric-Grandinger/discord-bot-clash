const { getTournamentData } = require('../api/riotApi.js');
const { dbCacheTournamentData, tournamentExistsAsync, saveError } = require('../database/db.js');
const { notifyNewClash } = require('../utils/messages.js');

async function cacheTurnamentData() {
	const result = await getTournamentData();
	const tournaments = [];
	const schedules = [];
	try {
		if (!result.success) return;
		for (const item of result.data) {
			const { schedule, ...tournament } = item;
			for (const s of schedule) {
				s.id = tournament.id;
				if ((await tournamentExistsAsync(tournament.id))) { // IT should be !
					notifyNewClash(tournament.id);
				}
			}
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
