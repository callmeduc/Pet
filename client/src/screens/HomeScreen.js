import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Col, Row } from 'react-bootstrap'
import { listProducts } from '../actions/productActions';
import Message from '../components/Message'
import Filter from '../components/Filter';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
      const { error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
        {/* <h2>Sản Phẩm Mới Nhất</h2> */}
        { error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Filter/>
        <Row>
            {products.map(product=> (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
        </>
      )}
        </>
    )
}

export default HomeScreen
