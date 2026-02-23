const { getTournamentData } = require('../../api/riotApi.js');
const { dbCacheTournamentData } = require('../../database/db.js');

async function cacheTurnamentData() {
	const result = await getTournamentData();
	if (!result.success) return;
	// TODO check for change of structure from API
	// if error check pritn error and return maybe crash?
	if (!getTournamentData()) {
		// TODO maybe use {success: true/false, Data: data}
		// This should only be printed in the DB file
		console.log('Error');
	}

}
