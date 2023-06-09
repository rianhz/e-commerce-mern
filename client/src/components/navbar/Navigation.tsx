import { NavLink } from "react-router-dom";
import "./nav.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "axios";
import { logoutUser } from "../../features/user/userSlice";

type PropsTypes = {
	handleShowCart: () => void;
};

const Navigation: React.FC<PropsTypes> = ({ handleShowCart }) => {
	const [mobile, setMobile] = useState<boolean>(false);
	const token = useAppSelector((state) => state.user.token);
	const cart = useAppSelector((state) => state.cart.cart);
	const user = useAppSelector((state) => state.user.user);

	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		await axios
			.post(`${process.env.REACT_APP_LOGOUT}`, "", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				dispatch(logoutUser());
				setMobile(!mobile);
			})
			.catch((error) => console.log(error.response.data));
	};

	return (
		<nav>
			<NavLink to="/" id="brand">
				<svg
					id="logo-38"
					width="78"
					height="32"
					viewBox="0 0 78 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
						className="ccustom"
						fill="#FF7A00"
					></path>
					<path
						d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
						className="ccompli1"
						fill="#FF9736"
					></path>
					<path
						d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
						className="ccompli2"
						fill="#FFBC7D"
					></path>{" "}
				</svg>
			</NavLink>
			<div className="bar-wrapper" onClick={() => setMobile(!mobile)}>
				{mobile ? <AiOutlineClose /> : <FaBars />}
			</div>
			<div className={mobile ? "nav-tab active" : "nav-tab"}>
				<div className="nav-tab-items">
					<NavLink id="home" to="/" onClick={() => setMobile(!mobile)}>
						Home
					</NavLink>
					<NavLink
						id="products"
						to="/products"
						onClick={() => setMobile(!mobile)}
					>
						Products
					</NavLink>
				</div>

				<div className="nav-sign">
					{user.username !== "" ? (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								gap: "2px",
								alignItems: "center",
							}}
						>
							<NavLink
								onClick={handleLogout}
								id="logLink"
								to="/"
								className="text-uppercase"
							>
								logout
							</NavLink>
							<span style={{ color: "white" }}>Hello, {user.username}</span>
						</div>
					) : (
						<NavLink
							id="logLink"
							to="/sign-in"
							className="text-uppercase"
							onClick={() => setMobile(!mobile)}
						>
							sign
						</NavLink>
					)}
				</div>
				<div className="cart" onClick={() => handleShowCart()}>
					<AiOutlineShoppingCart
						style={{
							fontSize: "30px",
							padding: "0",
							margin: "0",
						}}
					/>
					<span id="cart-nums">{cart.length}</span>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
