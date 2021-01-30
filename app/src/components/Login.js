import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ type }) => {
	const history = useHistory();
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const endpoint = type === "login" ? "login" : "register";
	const handleSubmit = (e) => {
		setError("");
		e.preventDefault();

		axios
			.post(`http://localhost:5000/api/auth/${endpoint}`, formValues)
			.then((res) => {
				type === "login" ? history.push("/users") : history.push("/login");
			})
			.catch((err) => {
				console.log(err);
				setError(err.response.data.message);
			});
	};

	return (
		<div className="login">
			<div className="login-form-wrapper">
				<h1>{type === "login" ? "Login" : "Sign Up"}</h1>
				{error && <div className="error">{error}</div>}
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={formValues.username}
						onChange={handleChange}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formValues.password}
						onChange={handleChange}
					/>
					<button type="submit">
						{type === "login" ? "Login" : "Sign Up"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
