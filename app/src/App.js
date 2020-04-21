import React from "react";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import Users from "./components/Users";
import "./App.scss";

function App() {
	return (
		<div className="App">
			<Route path="/login">
				<Login type="login" />
			</Route>
			<Route path="/register">
				<Login type="register" />
			</Route>
			<Route path="/users">
				<Users />
			</Route>
		</div>
	);
}

export default App;
