import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/users")
			.then((res) => setUsers(res.data))
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="users">
			<h1>Users</h1>
			{users.map((user, i) => (
				<div key={i} className="user">
					{user.username}
				</div>
			))}
		</div>
	);
};

export default Users;
