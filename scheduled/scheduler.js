const schedule = require('node-schedule');
const { getTournamentData } = require('../api/riotApi.js'); // TODO is test REMOVE
const { dbCacheTournamentData } = require('./cacheRiotData.js');
const rule = new schedule.RecurrenceRule();
// rule.second = 30;
/* rule.minute = [0, new schedule.Range(1, 60)];
const job = schedule.scheduleJob(rule, function() {
	console.log('The answer to life, the universe, and everything!');
});
*/
const job = schedule.scheduleJob('*/5 * * * * *', async function() { // WARNING is test REMOVE
	const result = await getTournamentData();
	console.log(result.data[0]);
});
console.log('Test');


const callDbCacheTournamentData = schedule.scheduleJob('* */12 * * *', function() {
	dbCacheTournamentData();
	// TODO improve this logic so that a custom timer is set to nofify one week before clash or if time < week but not notified
});
