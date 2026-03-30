const schedule = require('node-schedule');
const { cacheTurnamentData } = require('./cacheRiotData.js');
console.log('Test');
async function test() {
	await cacheTurnamentData();
}
test();
const callDbCacheTournamentData = schedule.scheduleJob('* * * * *', async function() { //  '0 */6 * * *'
	 cacheTurnamentData();
	// 1234 is temp. in final it will be the id of the tornbanebt
	// TODO. May need to move this logic

	// TODO improve this logic so that a custom timer is set to nofify one week before clash or if time < week but not notified
});
