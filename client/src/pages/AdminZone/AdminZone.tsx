import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { IProduct } from "../../product";
import axios from "axios";
import { Link } from "react-router-dom";
import "./admin.css";
import ReactPaginate from "react-paginate";

const AdminZone = () => {
	const [product, setProduct] = useState<IProduct[]>([]);
	const [allProduct, setAllProduct] = useState<IProduct[]>([]);
	const [pagiSetter, setPagiSetter] = useState<number>(0);

	console.log(pagiSetter);

	useEffect(() => {
		getProducts();
		getAllProducts();
	}, [pagiSetter]);

	const getAllProducts = async () => {
		const res = await axios.get(`${process.env.REACT_APP_GET_PRODUCTS}`);
		const data = await res.data;
		setAllProduct(data);
	};

	const getProducts = async () => {
		const res = await axios.get(
			`${process.env.REACT_APP_GET_PRODUCTS_PAGINATION}?page=${pagiSetter}`
		);
		const data = await res.data;
		setProduct(data);
	};

	const handlePageClick = (e: any) => {
		setPagiSetter(e.selected + 1);
	};

	return (
		<Container>
			<Row className="mt-5">
				<Col>
					<Link to="/add-product">
						<Button>ADD PRODUCTS</Button>
					</Link>
					<Table>
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
										<td className="d-flex gap-2 text-center">
											<Button>Edit</Button>
											<Button>Delete</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot>
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
						</tfoot>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default AdminZone;
