import React, { useState } from 'react'
import {
  Button,
  Form,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/checkoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>Shipping Info</h3>
              <p>
                <strong>Address: </strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem></ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
