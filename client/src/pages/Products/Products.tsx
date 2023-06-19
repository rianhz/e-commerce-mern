import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";

import {
	Input,
	InputGroup,
	InputRightElement,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import "./products.css";
import { IProduct } from "../../product";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addItem } from "../../features/cart/cartSlice";
import jwt_decode from "jwt-decode";
import { addUser } from "../../features/user/userSlice";
import toast, { Toaster } from "react-hot-toast";

const Products: React.FC = () => {
	const navigate = useNavigate();

	// main state
	const [product, setProduct] = useState<IProduct[]>();
	const [search, setSearch] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [refresher, setRefresher] = useState<boolean>(false);
	const [isSpin, setIsSpin] = useState<boolean>(false);
	const token = useAppSelector((state) => state.user.token);
	const user = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		getUserInfo();
	}, []);

	useEffect(() => {
		getProducts().finally(() => setIsSpin(true));
	}, [refresher]);

	// main functions
	const getProducts = async () => {
		const res = await axios.get(`${process.env.REACT_APP_GET_PRODUCTS}`, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.data.data;
		setProduct(data);
	};

	const getUserInfo = async () => {
		if (token === "" || token === undefined) return navigate("/sign-in");

		const temp = jwt_decode(token);
		dispatch(addUser(temp));
	};

	const handleSearchInput = async () => {
		const res = await axios.get(
			`${process.env.REACT_APP_PRODUCTS_SEARCH}?product_names=${search}`,
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const data = await res.data.data;

		setProduct(data);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_PRODUCTS_SEARCH_QUERY}?price=${price}&category=${category}`
			);
			const data = await res.data.data;

			setProduct(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteProduct = async (e: number) => {
		await axios
			.delete(`${process.env.REACT_APP_PRODUCTS_DELETE}/${e}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => toast.success(response.data.message));

		setRefresher(!refresher);
	};

	// onChange
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length === 0) {
			getProducts();
		}

		setSearch(e.target.value);
	};

	const handleChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPrice(e.target.value);
	};

	const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
	};

	const handleRadio = async (val: React.ChangeEvent<HTMLInputElement>) => {
		if (val.target.value === "az") {
			const res = await axios.get(`${process.env.REACT_APP_PRODUCTS_ASC}`);
			const data = await res.data.data;

			setProduct(data);
		} else if (val.target.value === "za") {
			const res = await axios.get(`${process.env.REACT_APP_PRODUCTS_DSC}`);
			const data = await res.data.data;

			setProduct(data);
		} else {
			getProducts();
		}
	};

	const handleKeyup = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const res = await axios.post(
				`https://e-commerce-mern-api-nu.vercel.app/products/search-product?product_names=${search}`
			);
			const data = await res.data;
			setProduct(data);
		}
	};

	return (
		<Container>
			<Toaster />
			<Row
				style={{
					boxShadow: "0 5px 15px -10px black",
					borderRadius: "20px",
					padding: "20px",
					marginTop: "70px",
					marginBottom: "15px",
				}}
			>
				<Col
					lg={3}
					md={12}
					sm={12}
					className="d-flex align-items-center justify-content-center"
				>
					<div className="radios" onChange={handleRadio}>
						<Form.Check
							label="All"
							name="radios"
							type="radio"
							value="all"
							id="all"
							defaultChecked
						/>
						<Form.Check
							label="A-Z"
							name="radios"
							type="radio"
							value="az"
							id="az"
						/>
						<Form.Check
							label="Z-A"
							name="radios"
							type="radio"
							value="za"
							id="za"
						/>
					</div>
				</Col>
				<Col lg={5} md={12} sm={12}>
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
				<Col lg={4} md={12} sm={12} className="mt-lg-0 mt-md-3 mt-sm-3 ">
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
							onChange={handleInputChange}
							value={search}
							onKeyUp={handleKeyup}
						/>
						<InputRightElement width="4.5rem">
							<Button size="sm" borderRadius="50%" onClick={handleSearchInput}>
								<BsSearch style={{ color: "black" }} />
							</Button>
						</InputRightElement>
					</InputGroup>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col className="d-flex gap-3">
					{user?.role === "buyer" ? (
						""
					) : user?.role === "seller" ? (
						<Link to="/admin">
							<Button colorScheme="blue">View as Table</Button>
						</Link>
					) : (
						<>
							<Link to="/admin">
								<Button colorScheme="blue">View as Table</Button>
							</Link>
							<Link to="/users">
								<Button colorScheme="blue">All Users</Button>
							</Link>
						</>
					)}
				</Col>
			</Row>
			<Row className="mt-3 d-flex justify-content-center align-items-center">
				{isSpin ? (
					""
				) : (
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				)}
				{product?.map((el, i) => {
					return (
						<Col
							lg={3}
							md={6}
							sm={6}
							key={i}
							className="mt-3 d-flex justify-content-center align-items-center"
						>
							<motion.div
								layout
								animate={{ opacity: 1 }}
								initial={{ opacity: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.7 }}
							>
								<Card width="15rem" boxShadow="0 3px 5px -2px black">
									<CardBody
										display="flex"
										flexDirection="column"
										justifyContent="space-between"
										height="100%"
									>
										<div
											style={{
												height: "170px",
												width: "100%",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Image src={el.product_image} />
										</div>
										<Stack>
											<Heading size="md">{el.product_name}</Heading>
											<Text color="blue.600" fontSize="2xl">
												Rp. {el.product_price}
											</Text>
										</Stack>

										{user?.role === "buyer" ? (
											<ButtonGroup
												spacing="2"
												display="flex"
												justifyContent="center"
												alignItems="center"
											>
												<Button
													variant="solid"
													colorScheme="blue"
													onClick={() => dispatch(addItem(el))}
												>
													Add to cart
												</Button>
											</ButtonGroup>
										) : (
											<ButtonGroup
												spacing="2"
												display="flex"
												justifyContent="center"
												gap="10px"
												alignItems="center"
											>
												<Link to={`/edit-product/${el._id}`}>
													<Button
														variant="solid"
														colorScheme="blue"
														width="100%"
														padding="0 30px"
													>
														Edit
													</Button>
												</Link>
												<Button
													padding="0 20px"
													variant="ghost"
													colorScheme="blue"
													onClick={() => handleDeleteProduct(el._id)}
												>
													Delete
												</Button>
											</ButtonGroup>
										)}
									</CardBody>
								</Card>
							</motion.div>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

export default Products;
