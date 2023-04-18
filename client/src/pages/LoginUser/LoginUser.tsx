import { Alert, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import { motion } from "framer-motion";

const LoginUser: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [alertStatus, setAlertStatus] = useState<boolean>(false);
	const [alertText, setAlertText] = useState<string>("");
	const [alertColor, setAlertColor] = useState<string>("");

	const handleAlert = (status: boolean, text: string, color: string) => {
		setAlertStatus(status);
		setAlertText(text);
		setAlertColor(color);
		setTimeout(() => {
			setAlertStatus(false);
		}, 1200);
	};

	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await axios.post(
				`${process.env.REACT_APP_LOGIN}`,
				{
					username: username,
					password: password,
				},
				{
					withCredentials: true,
				}
			);

			navigate("/products");
		} catch (error: any) {
			handleAlert(true, error.response.data.message, "danger");
		}
	};
	return (
		<div className="login-container">
			<motion.div
				className="form-login-wrapper"
				initial={{ opacity: 0, position: "absolute", top: "-400px" }}
				animate={{ opacity: 1, position: "relative", top: 0 }}
				exit={{ opacity: 0, position: "absolute", bottom: "-400px" }}
				transition={{ duration: 0.8 }}
			>
				<Form onSubmit={handleLogin}>
					<h2 className="text-uppercase text-center pb-3">sign in</h2>
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
					<span id="regSpan">
						Don't have account? Create{" "}
						<NavLink id="linkReg" to="/register">
							here
						</NavLink>
					</span>
					<Button className="text-uppercase d-block w-100 mt-4" type="submit">
						sign in
					</Button>
				</Form>
			</motion.div>
		</div>
	);
};

export default LoginUser;
