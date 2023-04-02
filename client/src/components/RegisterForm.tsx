import { Alert, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const RegisterForm: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfimPassword] = useState<string>("");
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const [status, setStatus] = useState<boolean>(false);
	const [alertText, setAlertText] = useState<string>("");
	const [alertColor, setAlertColor] = useState<string>("");

	const handleAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value;

		setIsAdmin(val === "seller" ? true : false);
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (username === "" || password === "") {
			setStatus(true);
			setAlertText("Fill all fields!");
			setAlertColor("danger");
			setTimeout(() => {
				setStatus(false);
			}, 2000);
		} else {
			axios.post("http://localhost:5000/users/register", {
				username: username,
				password: password,
				isAdmin: isAdmin,
			});

			setStatus(true);
			setAlertText("Register Success");
			setAlertColor("success");
			setTimeout(() => {
				setStatus(false);
			}, 2000);

			setUsername("");
			setPassword("");
			setConfimPassword("");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<h2 className="text-uppercase text-center pb-3">sign up</h2>
			<Alert variant={alertColor} className={status ? "d-block" : "d-none"}>
				{alertText}
			</Alert>
			<Form.Group className="mb-2">
				<Form.Control
					placeholder="Username"
					type="text"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
			</Form.Group>
			<Form.Group className="mb-2">
				<Form.Control
					placeholder="Password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</Form.Group>
			<Form.Group className="mb-2">
				<Form.Control
					placeholder="Confirm Password"
					type="password"
					onChange={(e) => setConfimPassword(e.target.value)}
					value={confirmPassword}
				/>
			</Form.Group>
			<Form.Group className="mb-2 d-flex">
				<Form.Check
					type="radio"
					label="Seller"
					name="status"
					className="me-4"
					value="seller"
					onChange={handleAdmin}
				></Form.Check>
				<Form.Check
					type="radio"
					label="Buyer"
					name="status"
					value="buyer"
					onChange={handleAdmin}
				></Form.Check>
			</Form.Group>
			<Button className="text-uppercase d-block w-100 mt-3" type="submit">
				submit
			</Button>
		</Form>
	);
};

export default RegisterForm;
