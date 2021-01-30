const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
	const user = req.body;
	const rounds = process.env.HASH_ROUNDS || 10;

	user.password = bcrypt.hashSync(user.password, rounds);

	Users.add(user)
		.then((user) => res.status(201).json(user))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

router.post("/login", (req, res) => {
	const { username, password } = req.body;

	Users.getByFilter({ username })
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				req.session.loggedIn = true;
				res.status(200).json({ message: "Welcome" });
			} else {
				res.status(401).json({ message: "Incorrect username or password" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

module.exports = router;
