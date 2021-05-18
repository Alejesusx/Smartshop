import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
const Footer = () => {
    return (
      <footer>
        <Container>
          <Row>
            <Col className='text-center py-3'>
              {' '}
              All rights reserved<span className='text-info'>n't</span> &copy;
              SmartShop | Alejandro Pérez
            </Col>
          </Row>
          <Row>
            <Col className='text-center py-3'>
              An E-commerce built with react/redux, express, Paypal Payments and
              MongoDB!
            </Col>
          </Row>
        </Container>
      </footer>
    )
}

export default Footer
