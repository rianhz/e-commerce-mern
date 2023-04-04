import LoginForm from "../../components/loginForm/LoginForm";
import "./login.css";

const LoginUser: React.FC = () => {
	return (
		<div className="login-container">
			<div className="form-login-wrapper">
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginUser;
