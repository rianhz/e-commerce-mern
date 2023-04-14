import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../App";
import { BsSearch } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
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
	RadioGroup,
	Radio,
	useRadioGroup,
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
	// main functions
	const [product, setProduct] = useState<IProduct[]>([]);
	const [search, setSearch] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	// modal
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	const handleSearchInput = async () => {
		const res = await axios.get(
			`${process.env.REACT_APP_PRODUCTS_SEARCH}=${search}`
		);
		const data = await res.data;
		setProduct(data);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length === 0) {
			getProducts();
		}
		setSearch(e.target.value);
	};

	const getUserInfo = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_GET_USER}`);
			const data = await res.data;
			setUser(data);
		} catch (error: any) {
			if (error) {
				console.log(error.response.data);
			}
			navigate("/sign-in");
		}
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await axios.get(
				`${process.env.REACT_APP_PRODUCTS_SEARCH_QUERY}price=${price}&category=${category}`
			);
			const data = await res.data;
			setProduct(data);
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPrice(e.target.value);
	};
	const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
	};

	const handleRadio = async (val: string | number) => {
		console.log(val);
		if (val === "2") {
			const res = await axios.get(`${process.env.REACT_APP_PRODUCTS_ASC}`);
			const data = await res.data;
			setProduct(data);
		} else {
			getProducts();
		}
	};

	const { getRadioProps } = useRadioGroup({
		onChange: handleRadio,
	});

	return (
		<Container className="contain">
			<Row
				style={{
					boxShadow: "0 5px 15px -10px black",
					borderRadius: "20px",
					padding: "20px",
				}}
			>
				<Col
					lg={2}
					md={12}
					sm={12}
					className="mt-lg-0 mt-md-3 mt-sm-3 d-flex align-items-center"
				>
					<Stack direction="row" {...getRadioProps()}>
						<Radio value="1">All</Radio>
						<Radio value="2">A-Z</Radio>
					</Stack>
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
				<Col lg={5} md={12} sm={12} className="mt-lg-0 mt-md-3 mt-sm-3 ">
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
						/>
						<InputRightElement width="4.5rem">
							<Button size="sm" borderRadius="50%" onClick={handleSearchInput}>
								<BsSearch style={{ color: "black" }} />
							</Button>
						</InputRightElement>
					</InputGroup>
				</Col>
			</Row>

			<Row className="mt-4 d-flex justify-content-center align-items-center">
				{product.map((el, i) => {
					return (
						<Col
							lg={3}
							md={6}
							sm={6}
							key={i}
							className="mt-3 d-flex justify-content-center align-items-center"
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
										<Image src={`http://localhost:5000/${el.product_image}`} />
									</div>
									<Stack>
										<Heading size="md">{el.product_name}</Heading>
										<Text color="blue.600" fontSize="2xl">
											Rp. {el.product_price}
										</Text>
									</Stack>

									<ButtonGroup spacing="2">
										<Button variant="solid" colorScheme="blue">
											Add to cart
										</Button>
										<Button
											variant="ghost"
											colorScheme="blue"
											onClick={handleShow}
										>
											Preview
										</Button>
									</ButtonGroup>
								</CardBody>
							</Card>
						</Col>
					);
				})}
			</Row>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Products;
