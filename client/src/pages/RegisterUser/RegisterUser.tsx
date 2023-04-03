import RegisterForm from "../../components/RegisterForm";
import "./regis.css";

const RegisterUser: React.FC = () => {
	return (
		<div className="regis-container">
			<div className="form-regis-wrapper">
				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterUser;