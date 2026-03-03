const schedule = require('node-schedule');
const { dbCacheTournamentData, isNotificationTimerSet } = require('./cacheRiotData.js');
const weekInMs = 604800000;
const oneHourInMs = 3600000;

const callDbCacheTournamentData = schedule.scheduleJob('0 */12 * * *', async function() {
	await dbCacheTournamentData();

	if (await isNotificationTimerSet()) {
		setNotificationTimer(1234);
	}

	// TODO improve this logic so that a custom timer is set to nofify one week before clash or if time < week but not notified
});
async function setNotificationTimer(startTimes) {
	for (let i = 0; i < startTimes.length; i++) {

		const scheduleDateWeekBefore = new Date(startTimes[i] - weekInMs);
		const scheduleDateHourBefore = new Date(startTimes[i] - oneHourInMs);

		schedule.scheduleJob(scheduleDateWeekBefore, function() {
			console.log('temp');// TODO add function in different file
		});

		schedule.scheduleJob(scheduleDateHourBefore, function() {
			console.log('temp');
		});
	}
}
