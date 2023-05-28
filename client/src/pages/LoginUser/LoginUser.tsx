import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../app/hooks";
import { addToken } from "../../features/user/userSlice";
import { Toaster, toast } from "react-hot-toast";

const LoginUser: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await axios
			.post(
				`${process.env.REACT_APP_LOGIN}`,
				{
					username: username,
					password: password,
				},
				{
					withCredentials: true,
				}
			)
			.then((data) => {
				dispatch(addToken(data.data.token));
				navigate("/products");
			})
			.catch((err: any) => {
				toast.error(err.response.data.message);
			});
	};

	return (
		<div className="login-container">
			<Toaster />
			<motion.div
				className="form-login-wrapper"
				initial={{ opacity: 0, position: "absolute", top: "-400px" }}
				animate={{ opacity: 1, position: "relative", top: 0 }}
				exit={{ opacity: 0, position: "absolute", bottom: "-400px" }}
				transition={{ duration: 0.8 }}
			>
				<Form onSubmit={handleLogin}>
					<h2 className="text-uppercase text-center pb-3">sign in</h2>

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
