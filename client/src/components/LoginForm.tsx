import { Alert, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [textAlert, setTextAlert] = useState<string>("");

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (username === "" || password === "") {
				setShowAlert(true);
				setTextAlert("Fill all fields!");
				setTimeout(() => {
					setShowAlert(false);
				}, 2000);
				return;
			}

			await axios.post("http://localhost:5000/users/login", {
				username: username,
				password: password,
			});

			navigate("/homepage");
		} catch (error: any) {
			setShowAlert(true);
			setTextAlert(error.message);
			setTimeout(() => {
				setShowAlert(false);
			}, 2000);
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<h2 className="text-uppercase text-center pb-3">sign in</h2>
			<Alert variant="danger" className={showAlert ? "d-block" : "d-none"}>
				{textAlert}
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
			<Button className="text-uppercase d-block w-100 mt-3" type="submit">
				sign in
			</Button>
		</Form>
	);
};

export default LoginForm;
