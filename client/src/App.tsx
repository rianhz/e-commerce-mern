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
import MyCart from "./components/cart/MyCart";
import AdminZone from "./pages/AdminZone/AdminZone";
import UsersInfo from "./pages/Users/UsersInfo";

function App() {
	const [user, setUser] = useState<IUser | undefined>();
	const [mobile, setMobile] = useState<boolean>(false);
	const [showCart, setShowCart] = useState<boolean>(false);

	const handleShowCart = () => setShowCart(!showCart);
	const closeCart = () => setShowCart(!showCart);

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
				handleShowCart={handleShowCart}
			/>
			<Routes>
				<Route path="/" element={<Landingpage />} />
				<Route path="/sign-in" element={<LoginUser />} />
				<Route path="/register" element={<RegisterUser />} />
				<Route path="/add-product" element={<FormProduct />} />
				<Route path="/edit-product/:id" element={<EditProduct />} />
				<Route path="/admin" element={<AdminZone />} />
				<Route path="/users" element={<UsersInfo />} />
				<Route
					path="/products"
					element={<Products setUser={setUser} user={user} />}
				/>
			</Routes>
			<MyCart showCart={showCart} closeCart={closeCart} />
		</div>
	);
}

export default App;
