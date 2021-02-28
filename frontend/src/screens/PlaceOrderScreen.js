import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PaypalImg from '../assets/Paypal.jpg'
import StripeImg from '../assets/stripe.png'
import GPayImg from '../assets/Google-Pay-logo.jpg'
import ApplePayImg from '../assets/ApAy.png'
import { createOrderAction } from '../actions/orderActions'
import {
  Button,
  Col,
  Row,
  ListGroup,
  Image,
  ListGroupItem,
  Card,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/checkoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice = cart.itemsPrice > 400 ? 0 : cart.itemsPrice * 0.05

  cart.taxPrice = (cart.itemsPrice * 0.03).toFixed(2)

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  var paymentlogo = ''
  switch (cart.paymentMethod) {
    case 'PayPal':
      paymentlogo = PaypalImg
      break
    case 'Stripe':
      paymentlogo = StripeImg
      break
    case 'ApplePay':
      paymentlogo = ApplePayImg
      break
    case 'Gpay':
      paymentlogo = GPayImg
      break

    default:
      break
  }
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    //eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

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
            <ListGroupItem>
              <h3>Payment Method</h3>
              <strong>Method: </strong>
              {'   '}
              <img
                className='img-rounded ml-3'
                src={paymentlogo}
                width='80vh'
                alt='logo'
              />
            </ListGroupItem>
            <ListGroupItem>
              <h3>Order List</h3>
              {cart.cartItems.length === 0 ? (
                <Message> Cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      {' '}
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className='text-info'>
                          {item.qty} x ${item.price} =  ${item.price * item.qty} 
                        </Col>
                      </Row>{' '}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary </h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col className='text-info'>${addDecimals(cart.itemsPrice)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col className='text-info'>${addDecimals(cart.shippingPrice)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col className='text-info'>${addDecimals(cart.taxPrice)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col className='text-info'>${addDecimals(cart.totalPrice)}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroupItem>
              <Button
                type='button'
                className='btn block py-2'
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
