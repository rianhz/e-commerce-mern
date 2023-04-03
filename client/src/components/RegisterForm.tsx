import { Alert, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfimPassword] = useState<string>("");
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const [alertStatus, setAlertStatus] = useState<boolean>(false);
	const [alertText, setAlertText] = useState<string>("");
	const [alertColor, setAlertColor] = useState<string>("");

	const navigate = useNavigate();

	const handleAlert = (status: boolean, text: string, color: string) => {
		setAlertStatus(status);
		setAlertText(text);
		setAlertColor(color);
		setTimeout(() => {
			setAlertStatus(false);
		}, 1500);
	};

	const handleAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value;

		setIsAdmin(val === "seller" ? true : false);
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (username === "" || password === "") {
			handleAlert(true, "Fill all fields!", "danger");
		} else if (password !== confirmPassword) {
			handleAlert(true, "Wrong confirm password!", "danger");
		} else {
			try {
				await axios
					.post("http://localhost:5000/users/register", {
						username: username,
						password: password,
						isAdmin: isAdmin,
					})
					.then((response) => {
						handleAlert(true, response.data.message, "success");
						setTimeout(() => {
							navigate("/sign-in");
						}, 1200);
					});
			} catch (error: any) {
				handleAlert(true, error.response.data.message, "danger");
			}

			setUsername("");
			setPassword("");
			setConfimPassword("");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<h2 className="text-uppercase text-center pb-3">sign up</h2>
			<Alert
				variant={alertColor}
				className={alertStatus ? "d-block" : "d-none"}
			>
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
					value="seller"
					onChange={handleAdmin}
				/>
				<Form.Check
					type="radio"
					label="Buyer"
					name="status"
					value="buyer"
					className="ms-3"
					onChange={handleAdmin}
				/>
			</Form.Group>
			<span id="acc">
				Already have account? Sign in{" "}
				<Link to="/sign-in" id="sign">
					here
				</Link>
			</span>
			<Button className="text-uppercase d-block w-100 mt-3" type="submit">
				submit
			</Button>
		</Form>
	);
};

export default RegisterForm;
