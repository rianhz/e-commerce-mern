import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../App";
import { BsSearch } from "react-icons/bs";
import {
	Input,
	InputGroup,
	InputRightElement,
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
import { IProduct } from "../../product";

axios.defaults.withCredentials = true;

type PropsTypes = {
	setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
	user: IUser | undefined;
};

const Products: React.FC<PropsTypes> = ({ setUser, user }) => {
	const navigate = useNavigate();
	const [product, setProduct] = useState<IProduct[]>([]);
	const [price, setPrice] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	useEffect(() => {
		getUserInfo();
	}, []);
	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async () => {
		const res = await axios.get("http://localhost:5000/products");
		const data = await res.data;
		setProduct(data);
	};

	console.log(product);

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
			<Row
				style={{
					boxShadow: "0 5px 15px -10px black",
					borderRadius: "20px",
					padding: "20px",
				}}
			>
				<Col lg={6} md={12} sm={12}>
					<form id="form-filter" onSubmit={handleSubmit}>
						<select id="price" onChange={handleChangePrice}>
							<option value="">Price</option>
							<option value="low">Low Cost</option>
							<option value="expensive">High Cost</option>
						</select>
						<select id="category" onChange={handleChangeCategory}>
							<option value="">Category</option>
							<option value="male">Male Products</option>
							<option value="female">Female Products</option>
							<option value="jewelery">Jewelery</option>
						</select>
						<Button type="submit" id="btn-filter">
							Filter
						</Button>
					</form>
				</Col>
				<Col lg={6} md={12} sm={12}>
					<InputGroup
						size="md"
						color="black"
						borderRadius={20}
						style={{ boxShadow: "0 5px 15px -10px black" }}
					>
						<Input
							pr="4.5rem"
							type="text"
							placeholder="Search product"
							borderRadius={20}
						/>
						<InputRightElement width="4.5rem">
							<Button size="sm" borderRadius="50%">
								<BsSearch style={{ color: "black" }} />
							</Button>
						</InputRightElement>
					</InputGroup>
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
							<Stack>
								<Heading size="md">Living room Sofa</Heading>
								<Text color="blue.600" fontSize="2xl">
									$450
								</Text>
							</Stack>
						</CardBody>
						<CardFooter>
							<ButtonGroup spacing="2">
								<Button variant="solid" colorScheme="blue">
									Add to cart
								</Button>
								<Button variant="ghost" colorScheme="blue">
									Preview
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
