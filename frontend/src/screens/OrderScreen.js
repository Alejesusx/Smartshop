import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import PaypalImg from '../assets/Paypal.jpg'
import StripeImg from '../assets/stripe.png'
import GPayImg from '../assets/Google-Pay-logo.jpg'
import ApplePayImg from '../assets/ApAy.png'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {emptyCart} from '../actions/cartActions'
import {
  Col,
  Row,
  ListGroup,
  Image,
  ListGroupItem,
  Card, Button
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderID = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

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

    if(!userInfo){
      history.push('/login')
    }

    const addPaypalScript = async () => {
      const { data: clientID } = await axios.get('/API/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderID))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderID, order, successPay, successDeliver])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderID, paymentResult))
    dispatch(emptyCart(orderID))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

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
                  Out for delivery since {order.deliveredAt.substring(0,10)} at {order.deliveredAt.substring(11, 16)}
                </Message>
              ) : (
                <Message variant='danger'> Not deliveded</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h3>Payment Method </h3>
              <p>
                <strong className='mr-1'>Method: </strong>
                <img
                  className='img-rounded ml-3'
                  src={paymentlogo}
                  width='80vh'
                  alt='logo'
                />
              </p>
              {order.isPaid ? (
                <Message variant='success'> Paid on {order.paidAt.substring(0,10)} at {order.paidAt.substring(11, 16)}</Message>
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
                          {item.qty} x ${item.price} = $
                          {(item.price * item.qty).toFixed(2)}
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
              { (userInfo && !order.isPaid)  && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                  )}
                </ListGroupItem>
              )}
              {
                loadingDeliver && <Loader/>
              }
              {(userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered) && (
                <ListGroupItem>
                  <Button type='button' className='btn btn-block btn-success' onClick={deliverHandler}> Mark as sent for deliver</Button>
                </ListGroupItem>
              )}

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
