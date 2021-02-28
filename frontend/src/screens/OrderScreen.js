import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PaypalImg from '../assets/Paypal.jpg'
import StripeImg from '../assets/stripe.png'
import GPayImg from '../assets/Google-Pay-logo.jpg'
import ApplePayImg from '../assets/ApAy.png'
import { getOrderDetails } from '../actions/orderActions'
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
import Loader from '../components/Loader'
import Message from '../components/Message'

const OrderScreen = ({ match }) => {
  const orderID = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  var paymentlogo = ''
  if (!loading) {
    switch (order.paymentMethod) {
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
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderID))
  }, [])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'> {error}</Message>
  ) : (
    <>
      <h3>Order: {order._id.toUpperCase()}</h3>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>Shipping Info</h3>
              <p>
                <strong className='mr-1'>Name:</strong> {order.user.name}{' '}
              </p>
              <p>
                {' '}
                <strong className='mr-1'>Email:</strong>{' '}
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>{' '}
              </p>
              <p>
                <strong className='mr-1'>Address: </strong>{' '}
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  {' '}
                  Delivered at {order.updatedAt}
                </Message>
              ) : (
                <Message variant='danger'> Not deliveded</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h3>Payment Method </h3>
              <p>
                <strong className='mr-1'>Method: </strong>
                {'   '}
                <img
                  className='img-rounded ml-3'
                  src={paymentlogo}
                  width='80vh'
                  alt='logo'
                />
              </p>
              {order.isPaid ? (
                <Message variant='success'> Paid on {order.updatedAt}</Message>
              ) : (
                <Message variant='danger'> Not Paid</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h3>Order List</h3>
              {order.orderItems.length === 0 ? (
                <Message> Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                          {item.qty} x ${item.price} = ${item.price * item.qty}
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
                  <Col className='text-info'>
                    $
                    {(
                      order.totalPrice -
                      (order.shippingPrice + order.taxPrice)
                    ).toFixed(2)}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col className='text-info'>
                    ${order.shippingPrice.toFixed(2)}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col className='text-info'>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col className='text-info'>
                    ${order.totalPrice.toFixed(2)}
                  </Col>
                </Row>
              </ListGroupItem>
              <Button
                type='button'
                className='btn block py-2'
                disabled={order.isPaid === true}
              >
                Pay Now
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
