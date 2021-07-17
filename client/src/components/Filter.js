import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { filterProducts } from "../actions/productActions";


export default function Filter() {
  const dispatch = useDispatch();
  const [searchkey, setsearchkey] = useState("");
  const [category, setcategory] = useState("all");
  return (
    <Container>
      <Row className="justify-content-center shadow-lg p-3 mb-2 rounded">
        <Col md="3">
          <input
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            value={searchkey}
            type="text"
            className="form-control w-100 mt-2"
            placeholder="Looking for pet food"
          />
        </Col>
        <Col md="3">
          <select
            className="form-control w-100 mt-2"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </Col>
        <Col md="3">
          <button className="btn w-100 mt-2 card-bottom-small btn btn-warning" onClick={()=> dispatch(filterProducts(searchkey , category))}>
            FILTER
          </button>
        </Col>
      </Row>
    </Container>
  );
}
