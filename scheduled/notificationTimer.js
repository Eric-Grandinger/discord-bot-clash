const schedule = require('node-schedule');
const weekInMs = (7 * 24 * 60 * 60 * 1000);
const oneHourInMs = 3600000;
const notifications = [];
function setNotificationTimer(startTimes, tournamentId) {
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
module.export = { setNotificationTimer };
