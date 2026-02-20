const fs = require('fs').promises;
// TODO add protection against race condition
async function readJson(path) {
	try {
		const data = await fs.readFile(path, { encoding: 'utf8' });
		return { success: true, statusCode: null, data: JSON.parse(data) };
	}
	catch (err) {
		if (err.code === 'ENOENT') {
			return { success: false, statusCode: err.code, data: null };
		}
		throw err;
	}
}
async function writeToJson(path, data) {
	try {
		await fs.writeFile(
			path,
			JSON.stringify(data, null, 2),
			'utf-8',
		);
		return { success: true, statusCode : null };
	}
	catch (err) {
		console.error(err);
		return { success: false, statusCode : err.code };
	}
}
module.exports = { readJson, writeToJson };
