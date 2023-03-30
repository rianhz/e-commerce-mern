import express from 'express'
import { addProduct, getProduct } from '../../actions/productsActions'

const productRouter = express.Router()

productRouter.get('/', getProduct)

productRouter.post('/', addProduct)

export default productRouter