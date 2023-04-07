import axios from "axios";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../App";

axios.defaults.withCredentials = true;

type PropsTypes = {
	setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
	user: IUser | undefined;
};

const DashBoard: React.FC<PropsTypes> = ({ setUser, user }) => {
	const navigate = useNavigate();

	useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		try {
			const res = await axios.get("http://localhost:5000/users/profile", {
				withCredentials: true,
			});
			const data = await res.data;
			setUser(data);
		} catch (error: any) {
			if (error) {
				console.log(error.response.data);
			}
			navigate("/sign-in");
		}
	};

	return (
		<Container className="contain">
			<h1>Welcome, {user?.username}</h1>
		</Container>
	);
};

export default DashBoard;
