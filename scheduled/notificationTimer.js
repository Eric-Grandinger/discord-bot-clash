const schedule = require('node-schedule');
const weekInMs = (7 * 24 * 60 * 60 * 1000);
const oneHourInMs = 60 * 60 * 1000; // 3600000 before
const notifications = [];
function isNotificationTimerSet(tournamentId) {
	return notifications.includes(tournamentId);
}
function setNotificationTimer(startTimes, tournamentId) {
	for (let i = 0; i < startTimes.length; i++) {

		const scheduleDateWeekBefore = new Date(startTimes[i] - weekInMs);
		const scheduleDateHourBefore = new Date(startTimes[i] - oneHourInMs);

		const jobWeek = schedule.scheduleJob(scheduleDateWeekBefore, function() {
			console.log('temp');// TODO add function in different file
		});

		const jobHour = schedule.scheduleJob(scheduleDateHourBefore, function() {
			console.log('temp');
		});
		notifications.push({ tournamentId, jobHour });
		notifications.push({ tournamentId, jobWeek });
	}
}
module.export = { setNotificationTimer, isNotificationTimerSet };
