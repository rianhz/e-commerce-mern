import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import LoginUser from "./pages/LoginUser/LoginUser";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import DashBoard from "./pages/Dashboard/Dashboard";
import Landingpage from "./pages/Landingpage/Landingpage";

export interface IUser {
	createdAt: Date;
	isAdmin: boolean;
	updatedAt: Date;
	username: string;
	__v: number;
	_id: string;
}

function App() {
	const [user, setUser] = useState<IUser | undefined>();

	const [mobile, setMobile] = useState<boolean>(false);

	const handleLogout = async () => {
		await axios
			.post("https://e-commerce-mern-api-three.vercel.app/users/logout")
			.then((data) => {
				setUser(undefined);
				setMobile(!mobile);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="App">
			<Navigation
				user={user}
				handleLogout={handleLogout}
				mobile={mobile}
				setMobile={setMobile}
			/>
			<Routes>
				<Route path="/" element={<Landingpage />} />
				<Route path="/sign-in" element={<LoginUser />} />
				<Route path="/register" element={<RegisterUser />} />
				<Route
					path="/products"
					element={<DashBoard setUser={setUser} user={user} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
