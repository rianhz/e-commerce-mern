import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./users.css";
import { IUser } from "../../user";

const UsersInfo = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [refresher, setRefresher] = useState<boolean>(false);

	// ALERT
	const [alertStatus, setAlertStatus] = useState<boolean>(false);
	const [alertText, setAlertText] = useState<string>("");
	const [alertColor, setAlertColor] = useState<string>("");

	const handleAlert = (status: boolean, text: string, color: string) => {
		setAlertStatus(status);
		setAlertText(text);
		setAlertColor(color);
		setTimeout(() => {
			setAlertStatus(false);
			setRefresher(!refresher);
		}, 1500);
	};

	const getUsers = async () => {
		const res = await axios.get(`${process.env.REACT_APP_ALL_USERS}`);
		const data = await res.data;
		setUsers(data);
	};

	const deleteUser = async (u: any) => {
		const res = await axios.delete(
			`${process.env.REACT_APP_DELETE_USERS}/${u}`
		);
		handleAlert(true, res.data.message, "success");
	};

	useEffect(() => {
		getUsers();
	}, [refresher]);

	return (
		<Container>
			<Row className="mt-5">
				<Col>
					<Alert
						variant={alertColor}
						className={alertStatus ? "d-block" : "d-none"}
					>
						{alertText}
					</Alert>
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
