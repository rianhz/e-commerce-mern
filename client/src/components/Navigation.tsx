import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../images/logo.jpg";
import { Link } from "react-router-dom";

const Navigation = () => {
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
					<Nav className="ms-auto gap-3">
						<Link to="/register" className="text-uppercase">
							sign up
						</Link>
						<Link to="/sign-in" className="text-uppercase">
							sign in
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
