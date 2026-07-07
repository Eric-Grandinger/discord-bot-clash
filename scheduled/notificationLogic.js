const schedule = require('node-schedule');
const weekInMs = (7 * 24 * 60 * 60 * 1000);
const oneHourInMs = 60 * 60 * 1000; // 3600000 before

async function notifyUsersWeekBefore() {

	/* TODO, notify all users signed up to receive messages
  * 1. Get list of all upcoming tournaments id, lookin time , notified user and cancelled
  * 2. Create a loop for all the tournaments
  * 3. retrieve the lockin time
  * 4. compare the time with week before and day before
  * 5. if current time < weekInMs AND notification has not be sent
  * 5.1. Call function to notify signed up users for sepecific tournament
  * 5.2 set notified to true
  * */
}
async function notifyUsersHourBefore() {
/* TODO, should only notify users that have signed up
 * 1. Get list of all upcoming tournaments id, lookin time , notified user and cancelled
 * 2. Create a loop for all tournaments
 * 4. check if cancelled
 * 4.1 if true send notification to all and notified to true.
 * 5. Compare time < oneHourInMs AND notification has not been sent
 * 5.1. Send notification to all signed up users
 * 5.2 Set notified to true (1)
 * */
}
module.exports = { notifyUsersWeekBefore, notifyUsersHourBefore };
