import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import Homepage from "./pages/Homepage/Homepage";
import LoginUser from "./pages/LoginUser/LoginUser";
import "./App.css";
import Landingpage from "./pages/Landingpage/Landingpage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route path="/" element={<Landingpage />} />
					<Route path="/homepage" element={<Homepage />} />
					<Route path="/register" element={<RegisterUser />} />
					<Route path="/sign-in" element={<LoginUser />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
