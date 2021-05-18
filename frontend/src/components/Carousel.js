import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { ListTopProducts } from '../actions/productActions'
import Product from './Product'

const ProductCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const dispatch = useDispatch()

  const topRatedProducts = useSelector((state) => state.topRatedProducts)
  const { loading, error, products } = topRatedProducts

  useEffect(() => {
    dispatch(ListTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      autoPlay={true}
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      centerMode={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      customTransition='transform 800ms ease-in-out'
      transitionDuration={500}
      containerClass='carousel-container'
      removeArrowOnDeviceType={['tablet', 'mobile']}
      dotListClass='custom-dot-list-style'
      itemClass='carousel-item-padding-40-px'
    >
      {products.map((product) => (
        <div>
          <Link to={`/product/${product._id}`}>
            <Product product={product} />
          </Link>
        </div>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
