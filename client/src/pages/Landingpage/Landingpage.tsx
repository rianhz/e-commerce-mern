import { FaLongArrowAltRight } from "react-icons/fa";
import "./landing.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landingpage = () => {
	return (
		<motion.div
			className="landing-container"
			initial={{ opacity: 0, position: "absolute", right: "-400px", top: "0" }}
			animate={{ opacity: 1, position: "relative", right: 0, top: "0" }}
			exit={{ opacity: 0, position: "absolute", right: "-400px", top: "0" }}
			transition={{ duration: 0.8 }}
		>
			<div className="landing-text">
				<h1>Shopping and Department Store.</h1>
				<p>
					Shopping is a bit of a relaxing hobby for me, which is sometimes
					troubling for the bank balance.
				</p>

				<Link id="shopnow" to="/sign-in">
					shop now
					<FaLongArrowAltRight style={{ padding: "0" }} />
				</Link>
			</div>
		</motion.div>
	);
};

export default Landingpage;
