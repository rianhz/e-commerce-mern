import axios from "axios";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

type PropsTypes = {
	getUserInfo: () => Promise<void>;
	refreshGetUserInfo: () => Promise<void>;
	user?: string;
	errorStatus?: number;
};

const Homepage: React.FC<PropsTypes> = ({
	getUserInfo,
	user,
	errorStatus,
	refreshGetUserInfo,
}) => {
	let firstRender = true;
	useEffect(() => {
		if (firstRender) {
			firstRender = false;
			getUserInfo();
		}

		let interval = setInterval(() => {
			refreshGetUserInfo();
		}, 1000 * 29);

		return () => clearInterval(interval);
	}, []);

	return (
		<Container className="contain">
			{errorStatus === 404 ? (
				<h1>
					Sign-in!{" "}
					<Link
						to="/sign-in"
						className="text-primary text-decoration-underline"
					>
						<small>here</small>
					</Link>
				</h1>
			) : (
				<h1>Hello, {user}</h1>
			)}
		</Container>
	);
};

export default Homepage;
