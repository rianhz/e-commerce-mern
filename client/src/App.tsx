import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import LoginUser from "./pages/LoginUser/LoginUser";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import Products from "./pages/Products/Products";
import Landingpage from "./pages/Landingpage/Landingpage";
import FormProduct from "./pages/FormAddProduct/FormProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import { IUser } from "./user";
import { useAppSelector } from "./app/hooks";

function App() {
	const [user, setUser] = useState<IUser | undefined>();
	const [mobile, setMobile] = useState<boolean>(false);
	console.log(user);

	const cart = useAppSelector((state) => state.cart);
	console.log(cart);

	const handleLogout = async () => {
		await axios
			.post(`${process.env.REACT_APP_LOGOUT}`)
			.then(() => {
				setUser(undefined);
				setMobile(!mobile);
			})
			.catch((error) => console.log(error.response.data));
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
				<Route path="/add-product" element={<FormProduct />} />
				<Route path="/edit-product/:id" element={<EditProduct />} />
				<Route
					path="/products"
					element={<Products setUser={setUser} user={user} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
