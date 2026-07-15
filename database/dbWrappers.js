// The wrappers are from https://www.sqlitetutorial.net/sqlite-nodejs/
const execute = async (db, sql, params = {}) => {
	return new Promise((resolve, reject) => {
		db.run(sql, params, function(err) {
			if (err) return reject(err);
			resolve({ lastID: this.lastID, changes: this.changes });
		});
	});
};
const fetchAll = async (db, sql, params) => {
	return new Promise((resolve, reject) => {
		db.all(sql, params, (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		});
	});
};

const fetchFirst = async (db, sql, params) => {
	return new Promise((resolve, reject) => {
		db.get(sql, params, (err, row) => {
			if (err) return reject(err);
			resolve(row);
		});
	});
};
module.exports = {
	execute,
	fetchAll,
	fetchFirst,
};
