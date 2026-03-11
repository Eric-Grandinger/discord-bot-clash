const { getTournamentData } = require('../api/riotApi.js');
const { dbCacheTournamentData } = require('../database/db.js');
const { setNotificationTimer, isNotificationTimerSet } = require('./notificationTimer.js');

async function cacheTurnamentData() {
	const result = await getTournamentData();
	const tournaments = [];
	const schedules = [];
	if (!result.success) return;
	for (const item of result.data) {
		try {
			const { schedule, ...tournament } = item;
			tournaments.push(tournament);
			schedules.push(...schedule);
			if (isNotificationTimerSet(schedule.id)) {
				setNotificationTimer(schedule.id, schedule.registrationTime);
			}
		}
		catch (error) {
			console.log(error.message + ' In cacheTurnamentData');
		}
	}
	console.log(tournaments);
	console.log(schedules);
	dbCacheTournamentData(tournaments, schedules);

}
module.exports = { cacheTurnamentData };
