import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import Homepage from "./pages/Homepage/Homepage";
import LoginUser from "./pages/LoginUser/LoginUser";
import "./App.css";
import Landingpage from "./pages/Landingpage/Landingpage";
import { useState } from "react";
import axios from "axios";

function App() {
	const [user, setUser] = useState<string>("");
	const [errorStatus, setErrorStatus] = useState<number>();

	const getUserInfo = async () => {
		const res = await axios
			.get("http://localhost:5000/users/profile", {
				withCredentials: true,
			})
			.catch((err) => {
				setErrorStatus(err.response.status);
			});
		setUser(res?.data.username);
	};
	const refreshGetUserInfo = async () => {
		const res = await axios
			.get("http://localhost:5000/users/refresh", {
				withCredentials: true,
			})
			.catch((err) => {
				console.log(err);
			});
		setUser(res?.data.username);
	};

	const handleLogout = async () => {
		const res = await axios
			.post("http://localhost:5000/users/logout", null, {
				withCredentials: true,
			})
			.catch((err) => {
				setErrorStatus(err.response.status);
			});

		if (res?.status === 200) {
			setUser("");
		}

		return new Error("cant logout");
	};

	return (
		<div className="App">
			<BrowserRouter>
				<Navigation user={user} handleLogout={handleLogout} />
				<Routes>
					<Route path="/" element={<Landingpage />} />
					<Route
						path="/homepage"
						element={
							<Homepage
								getUserInfo={getUserInfo}
								refreshGetUserInfo={refreshGetUserInfo}
								user={user}
								errorStatus={errorStatus}
							/>
						}
					/>
					<Route path="/register" element={<RegisterUser />} />
					<Route path="/sign-in" element={<LoginUser />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
