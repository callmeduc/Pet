import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { deliverOrder, getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [orderStatus, setorderStatus] = useState(1);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successDeliver, history, userInfo]);

  const deliverHandler = () => {
    if (orderStatus !== 0) {
      alert(orderStatus);
      dispatch(deliverOrder(order, orderStatus));
    }
    // dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user && order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {/* {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )} */}
              {order.orderStatus === 0 && <Message variant="danger">Pending.</Message>}
              {order.orderStatus === 1 && <Message variant="danger">Delivering</Message>}
              {order.orderStatus === 2 && <Message variant="success">Delivered on {order.deliveredAt}</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
            </ListGroup.Item>
            {order.note && (
              <ListGroup.Item>
                <p>
                  <strong>Note: </strong>
                  {order.note}
                </p>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {/* <Link to={`/product/`}> */}
                          {item.name}
                          {/* </Link> */}
                        </Col>
                        <Col>{item.varient}</Col>
                        <Col>{item.qty}</Col>
                        <Col md={4}>{item.price} VNĐ</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{order.itemsPrice} VNĐ</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice} VNĐ</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice} VNĐ</Col>
                </Row>
              </ListGroup.Item>
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Row>
                    <Col md={3}>Status</Col>
                    <Col>
                      <Form onSubmit={deliverHandler}>
                        <Form.Control
                          as="select"
                          value={orderStatus}
                          onChange={(e) => {
                            setorderStatus(e.target.value);
                          }}
                        >
                          <option value="0" disabled>
                            Pending
                          </option>
                          <option value="1" disabled={order.orderStatus === 1}>Delivering</option>
                          <option value="2">Delivered</option>
                          <option value="3">Cancel</option>
                        </Form.Control>
                        <Button type="submit" className="btn btn-block">
                          Mark As Delivered
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
