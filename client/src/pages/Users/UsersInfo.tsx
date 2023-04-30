import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./users.css";
import { IUser } from "../../user";

const UsersInfo = () => {
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const res = await axios.get(`${process.env.REACT_APP_ALL_USERS}`);
		const data = await res.data;
		setUsers(data);
	};

	const deleteUser = async (u: any) => {
		const res = await axios.delete(
			`${process.env.REACT_APP_DELETE_USERS}/${u}`
		);
	};

	return (
		<Container>
			<Row className="mt-5">
				<Col>
					<Table>
						<thead>
							<tr>
								<th>Username</th>
								<th>Role</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((el, i) => {
								return (
									<tr key={i}>
										<td>{el.username}</td>
										<td>{el.role}</td>
										<td className="d-flex gap-2 text-center">
											<Button onClick={() => deleteUser(el._id)}>Delete</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default UsersInfo;
