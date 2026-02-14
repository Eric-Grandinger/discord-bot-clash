const fs = require('fs').promises;

// function readJson(path) {
//	try {
//		const jsonString = fs.readFileSync(path, 'utf-8');
//		return { exists: true, data: JSON.parse(jsonString) };
//	}
//	catch (err) {
//		if (err.code === 'ENOENT') {
//			return { exists: false, data: null };
//		}
//		throw err;
//	}
// }
//

// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs

async function readJson(path) {
	try {
		const data = await fs.readFile(path, { encoding: 'utf8' });
		return { exists: true, data: JSON.parse(data) };
	}
	catch (err) {
		if (err.code === 'ENOENT') {
			return { exists: false, data: null };
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
		return true;
	}
	catch (err) {
		console.error(err);
		return false;
	}
}
module.exports = { readJson, writeToJson };
