import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Row, Col } from 'react-bootstrap'
import { ListProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/Carousel'
import { Link } from 'react-router-dom'
import Title from '../components/Title'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(ListProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Title     />
      {!keyword ? (
        <>
          <h4 className='text-primary mt-2'> ¡Our top rated Products!</h4>{' '}
          <ProductCarousel />
          <hr></hr>
        </>
      ) : (
        <Link to='/' className='btn btn-danger'>
          Go Back
        </Link>
      )}
      {!keyword ? (
        <h4 className='text-primary'> New Arrivals </h4>
      ) : (
        <h4 className='text-primary'> Results for "{keyword}" </h4>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error} </Message>
      ) : (
        <>  {products.length===0 && <Message variant='info'> No items found... </Message>}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
