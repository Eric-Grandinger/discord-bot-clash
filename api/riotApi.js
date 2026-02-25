const apiKey = process.env.RIOT_API_KEY;
if (!apiKey) throw new Error('RIOT_API_KEY not set in .env');
const axios = require('axios');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// https://typevar.dev/articles/axios/axios
const api = axios.create({
	baseURL: 'https://euw1.api.riotgames.com/lol/clash/v1',
	headers: { 'X-Riot-Token': apiKey },
});

function classifyError(error, location) { // TODO take a look att the formating of this. DO the function
	if (error.response) {
		console.log('RIOT_ERROR in ' + location, error.response.status);
		return { success: false, errorType:error.response.status, data: null };
	}
	else if (error.request) {
		console.log('NETWORK_ERROR in ' + location + error.message);
		return { success: false, errorType:error.code, data: null };
	}
	console.error('UNKNOWN_ERROR in ' + location + error.message);
	return { success: false, errorType:'UNKNOWN_ERROR', data: null };
}
// https://coderscratchpad.com/using-axios-with-async-await-modern-asynchronous-syntax/
async function riotGet(endpoint) {
	try {
		const response = await api.get(endpoint);
		return response.data.length !== 0 ? { success: true, errorType: null, data: response.data } :
			{ success: false, errorType: null, data: response.data };
	}
	catch (error) {
		// https://axios.rest/pages/advanced/error-handling
		const returnData = await classifyError(error, 'riotGet');
		return returnData;
	}
}

function handleApiError(code) {
	const codesToRetry = [ 429, 500, 502, 503, 504, 'EAI_AGAIN', 'ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED'];
	return codesToRetry.includes(code);
}
async function getData(endpoint, nrRetries, delayMs) {
	let result = await riotGet(endpoint);
	const possibleErrorCode = result.errorType;
	if (result.success) {
		return { success: result.success, data: result.data };
	}
	console.log(result.errorType);
	if (handleApiError(possibleErrorCode) && nrRetries > 0) {
		await delay(delayMs);
		result = await getData(endpoint, nrRetries - 1, delayMs * 2);
		return { success: result.success, data: result.data };
	}
	return { success: result.success, data: result.data };
}
async function getTournamentData() {
	const result = await getData('/tournaments', 4, 7500);
	return result;
}
module.exports = { getTournamentData };
