const schedule = require('node-schedule');
const { cacheTurnamentData, isNotificationTimerSet } = require('./cacheRiotData.js');
const { setNotificationTimer } = require('./notificationTimer.js');
console.log('Test');
async function test() {
	await cacheTurnamentData();
}
test();
const callDbCacheTournamentData = schedule.scheduleJob('0 */6 * * *', async function() {
	 cacheTurnamentData();
	// 1234 is temp. in final it will be the id of the tornbanebt
	// TODO. May need to move this logic

	// TODO improve this logic so that a custom timer is set to nofify one week before clash or if time < week but not notified
});
