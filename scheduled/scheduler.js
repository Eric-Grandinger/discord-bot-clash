const schedule = require('node-schedule');
const { dbCacheTournamentData, isNotificationTimerSet } = require('./cacheRiotData.js');
const weekInMs = 604800000;
const oneHourInMs = 3600000;
const callDbCacheTournamentData = schedule.scheduleJob('0 */12 * * *', async function() {
	await dbCacheTournamentData();

	if (await isNotificationTimerSet()) {
		//
	}

	// TODO improve this logic so that a custom timer is set to nofify one week before clash or if time < week but not notified
});
async function setNotificationTimer(startTime) {
	for (let i = 0; i < startTime.length; i++) {
		const convertedTime = startTime[i];
		const scheduleDateWeekBefore = new Date(startTime[i] - weekInMs);
		const scheduleDateHourBefore = new Date(startTime[i] - oneHourInMs);

		schedule.scheduleJob(scheduleDateWeekBefore, function() {
			console.log('temp');
		});

		schedule.scheduleJob(scheduleDateHourBefore, function() {
			console.log('temp');
		});
	}
}
