module.exports = (req, res, next) => {
	req.session.loggedIn
		? next()
		: res.status(401).json({ message: "Must login to access" });
};
