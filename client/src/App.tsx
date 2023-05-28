import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import LoginUser from "./pages/LoginUser/LoginUser";
import "./App.css";
import { useState } from "react";
import Products from "./pages/Products/Products";
import Landingpage from "./pages/Landingpage/Landingpage";
import FormProduct from "./pages/FormAddProduct/FormProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import MyCart from "./components/cart/MyCart";
import AdminZone from "./pages/AdminZone/AdminZone";
import UsersInfo from "./pages/Users/UsersInfo";
import { useAppSelector } from "./app/hooks";

function App() {
	const [showCart, setShowCart] = useState<boolean>(false);

	const handleShowCart = () => setShowCart(!showCart);
	const closeCart = () => setShowCart(!showCart);

	return (
		<div className="App">
			<Navigation handleShowCart={handleShowCart} />
			<Routes>
				<Route path="/" element={<Landingpage />} />
				<Route path="/sign-in" element={<LoginUser />} />
				<Route path="/register" element={<RegisterUser />} />
				<Route path="/add-product" element={<FormProduct />} />
				<Route path="/edit-product/:id" element={<EditProduct />} />
				<Route path="/admin" element={<AdminZone />} />
				<Route path="/users" element={<UsersInfo />} />
				<Route path="/products" element={<Products />} />
			</Routes>
			<MyCart showCart={showCart} closeCart={closeCart} />
		</div>
	);
}

export default App;
