import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Toaster, toast } from "react-hot-toast";

const EditProduct = () => {
	const params = useParams();
	const { id } = params;
	const navigate = useNavigate();

	const [pname, setPname] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [pmade, setPmade] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [pImage, setpImage] = useState<File | string>("");

	const token = useAppSelector((state) => state.user.token);

	useEffect(() => {
		getProducts();
	}, []);

	// ALERT
	const [alertStatus, setAlertStatus] = useState<boolean>(false);
	const [alertText, setAlertText] = useState<string>("");
	const [alertColor, setAlertColor] = useState<string>("");

	const handleAlert = (status: boolean, text: string, color: string) => {
		setAlertStatus(status);
		setAlertText(text);
		setAlertColor(color);
		setTimeout(() => {
			setAlertStatus(false);
			navigate("/products");
		}, 1500);
	};

	const getProducts = async () => {
		const res = await axios.post(`${process.env.REACT_APP_GET_PRODUCTS}/${id}`);
		const data = await res.data.data[0];

		setPname(data.product_name);
		setPrice(data.product_price);
		setPmade(data.product_made);
		setCategory(data.category);
		setDescription(data.desc);
		setpImage(data.product_image);
	};

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;

		const file: File = (target.files as FileList)[0];

		setpImage(file);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await axios.patch(
				`${process.env.REACT_APP_PRODUCTS_EDIT}/${id}`,
				{
					product_name: pname,
					product_price: parseInt(price),
					product_made: pmade,
					product_image: pImage,
					category: category,
					desc: description,
				},
				{
					headers: {
						"Content-Type": `multipart/form-data`,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await res.data;
			toast.success(data);
			setTimeout(() => {
				navigate("/products");
			}, 1000);
		} catch (error: any) {
			toast.success(error.response.data.message);
		}
	};

	return (
		<Container>
			<Toaster />
			<Row>
				<Col
					lg={12}
					md={8}
					sm={8}
					className="pt-5 mt-3 ps-2 pe-2 d-flex justify-content-center align-items-center"
				>
					<Form
						className="m-auto border border-1 border-dark p-3"
						onSubmit={handleSubmit}
						style={{
							width: "500px",
						}}
					>
						<h2>Edit Product</h2>
						<Form.Group className="mb-2 mt-3">
							<Form.Control
								type="text"
								placeholder="Product Name"
								value={pname}
								onChange={(e) => setPname(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Control
								type="number"
								placeholder="Price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Control
								type="text"
								placeholder="Product Made"
								value={pmade}
								onChange={(e) => setPmade(e.target.value)}
							/>
						</Form.Group>
						<Form.Select
							className="mb-2"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<option>Category</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="jewelery">Jewelery</option>
							<option value="furniture">Furniture</option>
							<option value="cookingTools">Cooking Tools</option>
							<option value="vehicle">Vehicle</option>
						</Form.Select>
						<Form.Group className="mb-2">
							<Form.Control
								as="textarea"
								rows={2}
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Image</Form.Label>
							<Form.Control type="file" onChange={handleChangeFile} />
						</Form.Group>

						<Button variant="primary" type="submit">
							Save
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default EditProduct;
