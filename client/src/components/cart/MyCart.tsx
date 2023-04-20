import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./cart.css";
import {
	addQuantity,
	removeItem,
	totalPayment,
} from "../../features/cart/cartSlice";
import { useEffect } from "react";

type PropsTypes = {
	showCart: boolean;
	closeCart: () => void;
};

const MyCart: React.FC<PropsTypes> = ({ showCart, closeCart }) => {
	const cartItem = useAppSelector((state) => state.cart.cart);
	const totalPay = useAppSelector((state) => state.cart.total_payment);

	const setCurrency = (num: number) => {
		return new Intl.NumberFormat("Rp", {
			style: "currency",
			currency: "idr",
		}).format(Math.round(num));
	};

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(totalPayment(cartItem));
	}, [cartItem]);

	return (
		<Offcanvas show={showCart} onHide={closeCart} placement="end">
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Payment : {setCurrency(totalPay)}</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className="position-relative">
				{cartItem.length === 0 ? (
					<p>No Items yet</p>
				) : (
					cartItem?.map((el, i) => {
						return (
							<div className="cart-body" key={i}>
								<div className="cartText">
									<h5>{el.product_name}</h5>
									<div className="cartRow2">
										<p>{setCurrency(el.product_price)}</p>
										<p>Total: {setCurrency(el.total_price)}</p>
									</div>
									<div className="cartRow3">
										<AiFillMinusSquare
											style={{ fontSize: "35px", cursor: "pointer" }}
											onClick={() => dispatch(removeItem(el))}
										/>

										<div>
											<h5>{el.quantity}</h5>
										</div>

										<AiFillPlusSquare
											style={{ fontSize: "35px", cursor: "pointer" }}
											onClick={() => dispatch(addQuantity(el._id))}
										/>
									</div>
								</div>
							</div>
						);
					})
				)}
				<div className="total">
					<Button variant="success">Checkout</Button>
				</div>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default MyCart;
