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
async function retry(endpoint) {
	const maxNumberRetries = 4;
	let retryDelay = 60000;
	let result;
	for (let nrRetries = 0; nrRetries < maxNumberRetries; nrRetries++) {
		await delay(retryDelay);
		retryDelay *= 2;
		result = await riotGet(endpoint);
		if (result.success) {
			return result;
		}
		if (!await handleApiError(result.errorType)) { // TODO verify if this works
			break;
		}
	}
	return result;
}
async function getData(endpoint) {
	let result = await riotGet(endpoint);
	const possibleErrorCode = result.errorType;
	delete result.errorType; // Only success and data needs to be sent
	if (result.success) {
		return result;
	}
	if (await handleApiError(possibleErrorCode)) { // TODO verify if this works
		result = await retry(endpoint);
		delete result.errorType; // Only success and data needs to be sent
		return result;
	}
	return result;
}
async function getTournamentData() {
	const result = await getData('/tournaments');
	return result;
}
async function test() {
	const result = await getTournamentData();
	// console.log(result);
	// TEMP
	console.log(result.data[0].schedule);
	delete result.data[0].schedule;
	console.log(result.data[0]);

}
test();
module.exports = { getTournamentData };
