const db = require("../data/dbConfig");

module.exports = {
	getAll,
	getByFilter,
	add,
};

function getAll() {
	return db("users");
}

function getByFilter(filter) {
	return db("users").where(filter).first();
}

function add(user) {
	return db("users")
		.insert(user)
		.then(([id]) => getByFilter({ id }));
}
