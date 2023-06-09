import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { IProduct } from "../../product";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import toast, { Toaster } from "react-hot-toast";

const AdminZone = () => {
	const [product, setProduct] = useState<IProduct[]>([]);
	const [allProduct, setAllProduct] = useState<IProduct[]>([]);
	const [pagiSetter, setPagiSetter] = useState<number>(1);
	const [refresher, setRefresher] = useState<boolean>(false);

	const token = useAppSelector((state) => state.user.token);
	const navigate = useNavigate();

	useEffect(() => {
		getProducts();
		getAllProducts();
	}, [pagiSetter, refresher]);

	const getAllProducts = async () => {
		const res = await axios.get(`${process.env.REACT_APP_GET_PRODUCTS}`);
		const data = await res.data.data;

		setAllProduct(data);
	};

	const getProducts = async () => {
		const res = await axios.post(
			`${process.env.REACT_APP_GET_PRODUCTS_PAGINATION}?page=${pagiSetter}`
		);
		const data = await res.data;

		setProduct(data);
	};

	const handlePageClick = (e: any) => {
		setPagiSetter(e.selected + 1);
	};

	const handleDeleteProduct = async (e: number) => {
		await axios
			.delete(`${process.env.REACT_APP_PRODUCTS_DELETE}/${e}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				toast.success(response.data.message);
				navigate("/products");
			});

		setRefresher(!refresher);
	};

	return (
		<Container className="admin-container">
			<Toaster />
			<Row className="mt-5">
				<Col className="table-rapper ">
					<div className="d-flex justify-content-between align-items-center mb-3 w-100">
						<Link to="/add-product">
							<Button>ADD PRODUCTS</Button>
						</Link>

						<Link to="/products" id="back">
							<span>
								<AiOutlineArrowLeft />
							</span>
							<span>Products</span>
						</Link>
					</div>
					<Table striped id="ptable">
						<thead>
							<tr>
								<th>Product</th>
								<th>Price</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{product.map((el, i) => {
								return (
									<tr key={i}>
										<td>{el.product_name}</td>
										<td>{el.product_price}</td>
										<td className="d-flex gap-2 align-items-center justify-content-center tditems">
											<Link to={`/edit-product/${el._id}`}>
												<Button>Edit</Button>
											</Link>
											<Button onClick={() => handleDeleteProduct(el._id)}>
												Delete
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<ReactPaginate
						previousLabel={"Prev"}
						nextLabel={"Next"}
						breakLabel={"..."}
						breakClassName={"break-me"}
						pageCount={Math.ceil(allProduct.length / 5)}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={handlePageClick}
						containerClassName={"pagination"}
						activeClassName={"activePagi"}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default AdminZone;
