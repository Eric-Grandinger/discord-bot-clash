const schedule = require('node-schedule');
const { cacheTurnamentData, isNotificationTimerSet } = require('./cacheRiotData.js');
const { setNotificationTimer } = require('./notificationTimer.js');
console.log('Test');
async function test() {
	await cacheTurnamentData();
}
test();
const callDbCacheTournamentData = schedule.scheduleJob('0 */12 * * *', async function() {
	await cacheTurnamentData();

	if (await isNotificationTimerSet()) {
		setNotificationTimer(1234, 1);
	}

	// TODO improve this logic so that a custom timer is set to nofify one week before clash or if time < week but not notified
});
