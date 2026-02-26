const { getTournamentData } = require('../../api/riotApi.js');
const { dbCacheTournamentData } = require('../../database/db.js');

async function cacheTurnamentData() {
	const result = await getTournamentData();
	let tournamentSchedule;
	let tournamentData;
	if (!result.success) return;
	// TODO check for change of structure from API
	// if error check pritn error and return maybe crash?
	// TODO maybe use {success: true/false, Data: data}
	// This should only be printed in the DB file
	for (let i = 0; i < result.data.length; i++) {
		try {
			tournamentSchedule = result.data[i].schedule;
			delete result.data[i].schedule;
			tournamentData = result.data[i];
		}
		catch (error) {
			console.log(error.message + ' In cacheTurnamentData');
		}
		await dbCacheTournamentData(tournamentData, tournamentSchedule);
	}
}
module.exports = { cacheTurnamentData };
