import React from "react";
import { Table, Col, Card, ListGroup, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const CartScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  var subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  var i = 1;
  const dispatch = useDispatch();

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <Table striped bordered hover className="block-text-cart">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr>
                  <td>{i++}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.qty} * {item.price} ={" "}
                    {item.qty * item.price} VNĐ
                  </td>
                  <td>
                    <i
                      className="fa fa-plus"
                      aria-hidden="true"
                      onClick={() => {
                        dispatch(
                          addToCart(item, item.qty + 1)
                        );
                      }}
                    ></i>
                    <b className="qty-number">{item.qty}</b>
                    <i
                      className="fa fa-minus"
                      aria-hidden="true"
                      onClick={() => {
                        dispatch(
                          addToCart(item, item.qty - 1)
                        );
                      }}
                    ></i>
                  </td>
                  <td>
                    <img
                      src={item.image}
                      style={{ height: "80px", width: "80px" }}
                      alt=""
                    />
                  </td>
                  <td>
                    <i
                      class="fa fa-trash"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
      <Col md={4} className="pt-5">
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal items</h2>
              {subtotal} VNĐ
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
