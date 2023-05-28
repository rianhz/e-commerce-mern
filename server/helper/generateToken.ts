import jwt from "jsonwebtoken";

interface UserProps {
	_id?: any;
	username?: string;
	email?: string;
	role?: string;
}

export const generateToken = (user: UserProps) => {
	const token = jwt.sign(
		{
			id: user?._id,
			username: user?.username,
			email: user?.email,
			role: user?.role,
		},
		process.env.SECRET_KEY as string,
		{
			expiresIn: "1h",
		}
	);

	return token;
};
