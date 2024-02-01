import express from 'express'
import { GetSingleProduct, addProduct, deleteProduct, getAllProducts, updateProduct, updateProductCover, updateProductImages } from './product.controller.js'
import { upload } from '../../src/middleware/FileUpload/uploads.js'

const productRouter = express.Router()

productRouter.get('/product', getAllProducts)
productRouter.post('/product',addProduct)
productRouter.get('/product/:id', GetSingleProduct)
productRouter.put('/product/:id', updateProduct)
productRouter.delete('/product/:id', deleteProduct)

productRouter.post('/productCoverUpdate/:id', upload.single('file'), updateProductCover)
productRouter.post('/productImages/:id', upload.array('file',6), updateProductImages)


export default productRouter