import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const addToCartHandle = ()=>{
    toast.info("You have added to cart.");
    dispatch(addToCart(product, qty))
  }
  return (
    <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
        <Form className="form-text">
          <Form.Group>
          <Form.Label>Quantity</Form.Label>
            <Form.Control style={{ width: "63px" }} size="sm" as="select" value={qty} onChange = {(e) => {
              setQty(e.target.value)
            }} >
              {[...Array(10).keys()].map((x,i)=> (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label></Form.Label>
          <Button size="sm" className="card-bottom-small-left" variant="primary" onClick={addToCartHandle}>Add to cart</Button>
          </Form.Group>
        </Form>
        <Card.Text as='div' className="rating-card">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <div className="card-bottom">
          <Card.Text className="card-bottom-small">Price:  {product.price * qty} VNĐ</Card.Text>
          
          <ToastContainer />
        </div>
      </Card.Body>
    </Card>
    
  );
};

export default Product;
