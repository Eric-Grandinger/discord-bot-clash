const apiKey = process.env.RIOT_API_KEY;
const axios = require('axios');

// https://typevar.dev/articles/axios/axios
const api = axios.create({
	baseURL: 'https://euw1.api.riotgames.com/lol/clash/v1',
	headers: { 'X-Riot-Token': apiKey },
});
// https://coderscratchpad.com/using-axios-with-async-await-modern-asynchronous-syntax/
async function riotGet(key) {
	try {
		const response = await api.get(key);
		return { exists : true, data:response.data };
	}
	catch (error) {
		// https://axios.rest/pages/advanced/error-handling
		if (error.response) {
			console.log(error.response.statusText);
			return { exists: false, data: error.response.status };
		}
		else if (error.request) {
			console.log(error.request);
			return { exists: false, data: error.request };
		}
		console.error(error.message);
		throw error;
	}
}
async function getTournamentData() {
	// TODO handel riot errors
	return riotGet('/tournaments');
}

module.exports = { getTournamentData };
