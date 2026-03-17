const schedule = require('node-schedule');
const weekInMs = (7 * 24 * 60 * 60 * 1000);
const oneHourInMs = 60 * 60 * 1000; // 3600000 before
const notifications = new Map();

function isNotificationTimerSet(tournamentId) {
	if (!notifications.has(tournamentId)) {
		return false;
	}
	const jobs = notifications.get(tournamentId);
	return jobs.jobWeek !== null && jobs.jobHour !== null; // if ether is missing return false
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
		notifications.set(tournamentId, { jobWeek, jobHour });
	}
}
module.exports = { setNotificationTimer, isNotificationTimerSet };
