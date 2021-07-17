import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


const getAllProducts = asyncHandler(async (req, res) => {
        const products = await Product.find({})
        if (products) {
            res.json(products)
          } else {
            res.status(404)
            throw new Error('Product not found')
          }
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
  
  // @desc    Delete a product
  // @route   DELETE /api/products/:id
  // @access  Private/Admin
  const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

  
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    // const {userInfo} = req.body
    console.log(req.body)
    const { name, price, image, category, description, userInfo } = req.body
    const product = new Product({
      name,
      user: userInfo._id,
      image,
      description,
  price: price,
  category
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })

  // @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      category,
    } = req.body
    console.log(req.body)
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.category = category
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

export { getAllProducts, getProductById, deleteProduct, createProduct , updateProduct}