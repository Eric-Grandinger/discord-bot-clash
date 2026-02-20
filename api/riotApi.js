const apiKey = process.env.RIOT_API_KEY;
const axios = require('axios');

// https://typevar.dev/articles/axios/axios
const api = axios.create({
	baseURL: 'https://euw1.api.riotgames.com/lol/clash/v1',
	headers: { 'X-Riot-Token': apiKey },
});
// https://coderscratchpad.com/using-axios-with-async-await-modern-asynchronous-syntax/
async function riotGet(endpoint) {
	try {
		const response = await api.get(endpoint);
		return { success: true, statusCode: null, data: response.data };
	}
	catch (error) {
		// https://axios.rest/pages/advanced/error-handling
		if (error.response) {
			console.log(error.response.statusText);
			return { success: false, statusCode:error.response.status, data: null };
		}
		else if (error.request) {
			console.log(error.request);
			return { success: false, statusCode:'NETWORK_ERROR', data: null };
		}
		console.error(error.message);;
		return { success: false, statusCode:'UNKNOWN_ERROR', data: null };
	}
}
async function getTournamentData() {
	// TODO handel riot errors
	const result = await riotGet('/tournaments');
	if (result.success) {
		return result.data;
	}
	return null;
}
module.exports = { getTournamentData };
