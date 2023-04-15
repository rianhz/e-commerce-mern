import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FormProduct: React.FC = () => {
	const [pname, setPname] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [pmade, setPmade] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [pImage, setpImage] = useState<File | null>(null);

	const navigate = useNavigate();

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

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;

		const file: File = (target.files as FileList)[0];

		setpImage(file);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_ADD_PRODUCTS}`,
				{
					product_name: pname,
					product_price: parseInt(price),
					product_made: pmade,
					product_image: pImage,
					category: category,
					desc: description,
				},
				{
					headers: { "Content-Type": `multipart/form-data` },
				}
			);
			const data = await res.data;
			handleAlert(true, data.message, "success");

			setPname("");
			setPmade("");
			setPrice("");
			setpImage(null);
			setCategory("");
			setDescription("");
		} catch (error: any) {
			handleAlert(true, error.response.data.message, "danger");
		}
	};
	return (
		<Container>
			<Row>
				<Col lg={6} className="pt-5 ps-2 pe-2 offset-md-3">
					<Form
						className="m-auto border border-1 border-dark p-3 rounded"
						onSubmit={handleSubmit}
					>
						<h2>Add Product</h2>
						<Alert
							variant={alertColor}
							className={alertStatus ? "d-block" : "d-none"}
						>
							{alertText}
						</Alert>
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
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default FormProduct;
