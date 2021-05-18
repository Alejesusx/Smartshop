import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Title from '../components/Title'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <Row>
      <Title title='Cart | SmartShop' />
      <Col md={8}>
        <h3>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'> Go Back </Link>{' '}
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} className='my-2'>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className='my-2 text-info'>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      className='my-2'
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {' '}
                          {x + 1}{' '}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      className='btn-block my-2'
                      variant='danger'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      {' '}
                      <i className='fas fa-trash-alt'></i>{' '}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {cartItems.length === 0 ? (
                <h4> Cart is empty </h4>
              ) : (
                <h4>
                  Subtotal of your (
                  <span className='text-info'>
                    {cartItems.reduce((count, item) => count + item.qty, 0)}
                  </span>
                  ) items:
                </h4>
              )}
              <span className='text-info'>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block btn-primary'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                {' '}
                Proceed to checkout{' '}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
