import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js'
const router = express.Router()

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').delete(deleteProduct).get(getProductById).put(updateProduct)


export default router