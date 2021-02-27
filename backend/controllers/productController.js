import asyncHandler from 'express-async-handler'
import Product from '../Models/ProductModel.js'

// Description: Fetch all the products
// Route: GET /API/products
//type: public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// Description: Fetch a single product by its id
// Route: GET /API/products/:id
//type: public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProductById, getProducts }
