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
async function wrapper() {
	const result = await readJson('./test.json');
	console.log(result);
}
wrapper();

function writeToJson(path, obj) {
	return true;
}
module.exports = { readJson, writeToJson };
