import express from 'express'
import { createProduct, createProductReview, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js'
const router = express.Router()

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').delete(deleteProduct).get(getProductById).put(updateProduct)
router.route('/:id/reviews').post(createProductReview)


export default router