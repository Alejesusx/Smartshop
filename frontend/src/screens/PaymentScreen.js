import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import PaypalImg from '../assets/Paypal.jpg'
import StripeImg from '../assets/stripe.png'
import GPayImg from '../assets/Google-Pay-logo.jpg'
import ApplePayImg from '../assets/ApAy.png'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/checkoutSteps'
import Title from '../components/Title'

const PaymentScreen = ({ history }) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress)

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))

    history.push('/placeorder')
  }

  return (
    <>
      <Title title='Select Payment Method' />
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h3>Payment Method</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address' className='my-3'>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Form.Row className='mb-2'>
              <Col>
                <Form.Check
                  className=' text-success mt-3'
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
              <Col>
                <img
                  className='img-rounded'
                  src={PaypalImg}
                  width='80vh'
                  alt='logo'
                />
              </Col>
            </Form.Row>
            <Form.Row className='mb-2'>
              <Col>
                <Form.Check
                  className='mb-2 text-success mt-3 '
                  type='radio'
                  label='Stripe'
                  disabled
                  id='Stripe'
                  name='paymentMethod'
                  value='Stripe'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
              <Col>
                <img
                  className='img-rounded'
                  src={StripeImg}
                  width='80vh'
                  alt='logo'
                />
              </Col>
            </Form.Row>
            <Form.Row className='mb-2'>
              <Col>
                <Form.Check
                  className='mb-2 text-success mt-3 '
                  type='radio'
                  label='Apple Pay'
                  id='ApplePay'
                  disabled
                  name='paymentMethod'
                  value='ApplePay'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
              <Col>
                <img
                  className='img-rounded'
                  src={ApplePayImg}
                  width='80vh'
                  alt='logo'
                />
              </Col>
            </Form.Row>
            <Form.Row className='mb-2'>
              <Col>
                <Form.Check
                  className='mb-2 text-success mt-3 '
                  type='radio'
                  label='Google Pay'
                  disabled
                  id='GPay'
                  name='paymentMethod'
                  value='Gpay'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
              <Col>
                <img
                  className='img-rounded'
                  src={GPayImg}
                  width='80vh'
                  alt='logo'
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Button className='my-4' type='submit' variant='primary' block='true'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
