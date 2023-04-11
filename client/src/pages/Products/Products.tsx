import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../App";
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import "./products.css";

axios.defaults.withCredentials = true;

type PropsTypes = {
	setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
	user: IUser | undefined;
};

const Products: React.FC<PropsTypes> = ({ setUser, user }) => {
	const navigate = useNavigate();
	const [price, setPrice] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	// useEffect(() => {
	// 	getUserInfo();
	// }, []);

	const getUserInfo = async () => {
		try {
			const res = await axios.get("http://localhost:5000/users/profile");
			const data = await res.data;
			setUser(data);
		} catch (error: any) {
			if (error) {
				console.log(error.response.data);
			}
			navigate("/sign-in");
		}
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};
	const handleChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPrice(e.target.value);
	};
	const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
	};

	return (
		<Container className="contain">
			<Row>
				<Col>
					<form id="form-filter" onSubmit={handleSubmit}>
						<select id="price" onChange={handleChangePrice}>
							<option value="">Price</option>
							<option value="low">Low Cost</option>
							<option value="high">High Cost</option>
						</select>
						<select id="category" onChange={handleChangeCategory}>
							<option value="">Category</option>
							<option value="male">Male Products</option>
							<option value="female">Female Products</option>
							<option value="jewelery">Jewelery</option>
						</select>
						<Button type="submit">Filter</Button>
					</form>
				</Col>
			</Row>

			<Row className="mt-4">
				<Col
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Card width="15rem" boxShadow="0 3px 5px -2px black">
						<CardBody>
							<Image
								src=""
								alt="Green double couch with wooden legs"
								borderRadius="lg"
							/>
							<Stack mt="6" spacing="3">
								<Heading size="md">Living room Sofa</Heading>

								<Text color="blue.600" fontSize="2xl">
									$450
								</Text>
							</Stack>
						</CardBody>
						<CardFooter>
							<ButtonGroup spacing="2">
								<Button variant="solid" colorScheme="blue">
									Buy now
								</Button>
								<Button variant="ghost" colorScheme="blue">
									Add to cart
								</Button>
							</ButtonGroup>
						</CardFooter>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Products;
