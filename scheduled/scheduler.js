const schedule = require('node-schedule');
const { cacheTurnamentData } = require('./cacheRiotData.js');
const { saveError } = require('../database/db.js');
const { notifyUsersWeekBefore, notifyUsersHourBefore } = require('./notificationTimer.js');

function createJob(cronPattern, nameOfTask, task) {
	return schedule.scheduleJob(cronPattern, async function() {
		try {
			await task();
		}
		catch (error) {
			saveError('In scheduler.js fun createJob Task ' + nameOfTask, error);
		}
	});
}
createJob('0 */6 * * *', 'cacheTurnamentData', cacheTurnamentData);
createJob('*/10 14-23 * * 5-7', 'weekBeforeNotificationJob', notifyUsersWeekBefore);
createJob('*/10 14-23 * * 5-7', 'hourBeforeNotificationJob', notifyUsersHourBefore);
