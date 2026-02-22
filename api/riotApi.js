const apiKey = process.env.RIOT_API_KEY;
if (!apiKey) throw new Error('RIOT_API_KEY not set in environment');
const axios = require('axios');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


async function classifyError(error, location) {
	if (error.response) {
		console.log('RIOT_ERROR in ' + location + error.response);
		return { success: false, errorType:'RIOT_ERROR', data: error.response.status };
	}
	else if (error.request) {
		console.log('NETWORK_ERROR in ' + location + error.request);
		return { success: false, errorType:'NETWORK_ERROR', data: null };
	}
	console.error('UNKNOWN_ERROR in ' + location + error.message);
	return { success: false, errorType:'UNKNOWN_ERROR', data: null };
}
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
		const returnData = await classifyError(error, 'riotGet');
		return returnData;
	}
}

async function handleApiError(code) { // TODO can i use intigers ro should i use stringformat
	switch (code) {
	case 429: // rate limit
		console.log('Rate limit exceeded. Trying again');
		return true;
	case 500:
		console.log('Internal server error. Trying again');
		return true;
	case 502:
		console.log('Bad gateway. Trying again');
		return true;
	case 503:
		console.log('Service unavailable. Trying again');
		return true;
	case 504:
		console.log('Gateway timeout. Trying again');
		return true;
	default:
		return false;
	}
}
async function retry(endpoint) {
	const maxNumberRetries = 5;
	let errorType = null;
	let retryDelay = 1000;

	for (let nrRetries = 0; nrRetries < maxNumberRetries; nrRetries++) {
		await delay(retryDelay);
		retryDelay *= 2;
		try {
			const response = await api.get(endpoint);
			return { success: true, statusCode: null, data: response.data };
		}
		catch (error) {
			errorType = await classifyError(error, 'retry');
			console.log(error.message + 'in retry ' + nrRetries);
		}
	}
	return { success: false, errorType:errorType, data: null };
}
async function getTournamentData() {
	let result = await riotGet('/tournaments');
	if (result.success) {
		// TODO Should this data be converted to more usfull format?
		return result.data;
	}
	if (await handleApiError(result.data)) { // TODO verify if this works
		result = await retry('/tournaments');
		return result;
	}
	return null;
}
module.exports = { getTournamentData };
