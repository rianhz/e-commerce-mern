export interface IUser {
	_id: string;
	username: string;
	email: string;
	role: "buyer" | "seller" | "admin";
	createdAt: string;
	updatedAt: string;
	__v: number;
}
