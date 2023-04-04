import { NavLink } from "react-router-dom";
import "./nav.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

type PropsTypes = {
	user: string;
	handleLogout: () => void;
	mobile: boolean;
	setMobile: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navigation: React.FC<PropsTypes> = ({
	user,
	handleLogout,
	mobile,
	setMobile,
}) => {
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
					{user ? (
						<NavLink
							onClick={handleLogout}
							id="logLink"
							to="/"
							className="text-uppercase"
						>
							logout
						</NavLink>
					) : (
						<NavLink
							id="logLink"
							to="/sign-in"
							className="text-uppercase"
							onClick={() => setMobile(!mobile)}
						>
							sign in
						</NavLink>
					)}
				</div>
			</div>
		</nav>

		// <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
		// 	<Container>
		// 		<Link to="/" id="brand">
		// 			<svg
		// 				id="logo-38"
		// 				width="78"
		// 				height="32"
		// 				viewBox="0 0 78 32"
		// 				fill="none"
		// 				xmlns="http://www.w3.org/2000/svg"
		// 			>
		// 				{" "}
		// 				<path
		// 					d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
		// 					className="ccustom"
		// 					fill="#FF7A00"
		// 				></path>{" "}
		// 				<path
		// 					d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
		// 					className="ccompli1"
		// 					fill="#FF9736"
		// 				></path>{" "}
		// 				<path
		// 					d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
		// 					className="ccompli2"
		// 					fill="#FFBC7D"
		// 				></path>{" "}
		// 			</svg>
		// 		</Link>
		// 		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		// 		<Navbar.Collapse id="basic-navbar-nav">
		// 			<Nav className="ms-auto gap-3 pt-lg-0 pt-md-5 ">
		// 				{user && (
		// 					<Link
		// 						onClick={handleLogout}
		// 						id="logLink"
		// 						to="/"
		// 						className="text-uppercase"
		// 					>
		// 						logout
		// 					</Link>
		// 				)}

		// 				{!user && (
		// 					<>
		// 						<Link
		// 							id="regLink"
		// 							to="/register"
		// 							className="text-uppercase d-md-block d-lg-inline"
		// 						>
		// 							sign up
		// 						</Link>
		// 						<Link id="logLink" to="/sign-in" className="text-uppercase">
		// 							sign in
		// 						</Link>
		// 					</>
		// 				)}
		// 			</Nav>
		// 		</Navbar.Collapse>
		// 	</Container>
		// </Navbar>
	);
};

export default Navigation;
