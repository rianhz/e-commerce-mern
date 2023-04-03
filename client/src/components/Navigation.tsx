import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../images/logo.jpg";
import { Link } from "react-router-dom";

type PropsTypes = {
	user: string;
	handleLogout: () => void;
};

const Navigation: React.FC<PropsTypes> = ({ user, handleLogout }) => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
			<Container>
				<Link to="/" id="brand">
					<img
						src={logo}
						alt="logo"
						width="50"
						height="50"
						className="d-inline-block rounded-circle me-2"
					/>
					MeepoMart
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto gap-3 pt-lg-0 pt-md-5 ">
						{user && (
							<Link
								onClick={handleLogout}
								id="logLink"
								to="/"
								className="text-uppercase"
							>
								logout
							</Link>
						)}

						{!user && (
							<>
								<Link
									id="regLink"
									to="/register"
									className="text-uppercase d-md-block d-lg-inline"
								>
									sign up
								</Link>
								<Link id="logLink" to="/sign-in" className="text-uppercase">
									sign in
								</Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
