import "./regis.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

const RegisterUser: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [confirmPassword, setConfimPassword] = useState<string>("");
	const [isAdmin, setIsAdmin] = useState<string>("");

	const navigate = useNavigate();

	const handleAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value;

		setIsAdmin(val === "seller" ? "seller" : "buyer");
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await axios
				.post(
					`${process.env.REACT_APP_REGISTER}`,
					{
						username: username,
						email: email,
						password: password,
						confirmPassword: confirmPassword,
						role: isAdmin,
					},
					{
						headers: {
							"Content-Type": `application/x-www-form-urlencoded`,
						},
					}
				)
				.then((response) => {
					toast.success(response.data.message);

					setTimeout(() => {
						navigate("/sign-in");
					}, 1000);

					setUsername("");
					setPassword("");
					setEmail("");
					setConfimPassword("");
				});
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};
	return (
		<div className="regis-container">
			<motion.div
				className="form-regis-wrapper"
				initial={{ opacity: 0, position: "absolute", top: "-400px" }}
				animate={{ opacity: 1, position: "relative", top: 0 }}
				exit={{ opacity: 0, position: "absolute", bottom: "-400px" }}
				transition={{ duration: 0.8 }}
			>
				<Form onSubmit={handleSubmit}>
					<h2 className="text-uppercase text-center pb-3">sign up</h2>

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
							placeholder="Email"
							type="text"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
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
						Already have account? Sign in
						<Link to="/sign-in" id="linkSign">
							here
						</Link>
					</span>
					<Button className="text-uppercase d-block w-100 mt-3" type="submit">
						submit
					</Button>
				</Form>
			</motion.div>
			<Toaster />
		</div>
	);
};

export default RegisterUser;
