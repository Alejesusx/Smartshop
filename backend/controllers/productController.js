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

// Description: Delete a product
// Route: DELETE /API/products/:id
//type: private / Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// Description: create a product
// Route: POST /API/products/
//type: private / Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// Description: update a product
// Route: PUT /API/products/:id
//type: private / Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

    const product = await Product.findById(req.params.id)

    if(product){

      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock

      const updatedProduct = await product.save()
      res.status(201).json(updatedProduct)
    }else{
      res.status(404)
      throw new Error('Product not found')
    }

})

export { getProductById, getProducts, deleteProduct, createProduct, updateProduct }
