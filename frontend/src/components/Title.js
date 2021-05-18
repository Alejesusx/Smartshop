import React from 'react'

import { Helmet } from 'react-helmet'

const Title = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Title.defaultProps = {
  title: 'Welcome To SmartShop',
  description:
    'An E-commerce built with react/redux, express, Paypal Payments and MongoDB!',
  keywords: 'E-commerce, Online Shop',
}

export default Title
