const express = require("express");
const cors = require("cors");
const session = require("express-session");

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const checkAuth = require("../auth/checkAuth");

const server = express();

const sessionConfig = {
	name: "cookie",
	secret: process.env.SESSION_SECRET || "c'est la vie",
	resave: false,
	saveUninitialized: process.env.SEND_COOKIES || true,
	cookie: {
		maxAge: 1000 * 30,
		secure: process.env.USE_SECURE_COOKIES || false,
		httpOnly: true,
	},
};

server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", checkAuth, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;
