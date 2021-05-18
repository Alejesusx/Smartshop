import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  ListGroupItem,
  FormGroup,
  FormLabel,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, createReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Title from '../components/Title'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productCreateReview

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    if(successReview){
      alert('Review submitted successfully!')
      setRating(0)
      setComment('')
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createReview(match.params.id, {
      rating,
      comment
    }))
  }

  return (
    <>
      <Link className='btn btn-danger my-2' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Title title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`from ${product.numReviews} reviews`}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price:
                  <strong className='text-info'> ${product.price} </strong>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price} </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong
                          className={
                            product.countInStock > 0
                              ? 'text-success'
                              : 'text-danger'
                          }
                        >
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className={
                        product.countInStock > 0
                          ? 'btn-block btn-primary'
                          : 'btn-block btn-outline-primary disabled'
                      }
                      type='button'
                    >
                      {' '}
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && (
                <Message variant='secondary'>No reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroupItem>
                    <Row>
                      <Col>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating}></Rating>
                      </Col>
                      <Col md={6} className='d-flex justify-content-end'>
                        <p>{review.createdAt.substring(0, 10)} </p>
                      </Col>
                    </Row>
                    <p> {review.comment} </p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h6>
                    Write a review for{' '}
                    <span className='text-info'> {product.name} </span>{' '}
                  </h6>
                  {errorReview && <Message variant='danger'>{errorReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId='rating'>
                        <FormLabel>Rating</FormLabel>
                        <Form.Control md={4}
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                                <option value=''> Select...</option>
                                <option value='1'> 1- Poor</option>
                                <option value='2'> 2- Bad</option>
                                <option value='3'> 3- Good</option>
                                <option value='4'> 4- Very Good</option>
                                <option value='5'> 5- Excellent</option>
                          </Form.Control>
                      </FormGroup>
                      <FormGroup controlId='comment'>
                      <FormLabel>Comment</FormLabel>
                      <Form.Control as='textarea' row='3'  onChange={(e) => setComment(e.target.value)}></Form.Control>
                      </FormGroup>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                      {loadingReview && <Loader/>}
                    </Form>
                  ) : (
                    <Message variant='secondary'>
                      {' '}
                      Please{' '}
                      <Link className='text-info' to='/login'>
                        {' '}
                        Login
                      </Link>{' '}
                      to write a review{' '}
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
