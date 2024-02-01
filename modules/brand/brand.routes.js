import express from 'express'
import { GetSingleBrand, addBrand, deleteBrand, getAllBrands, updateBrand, updateBrandCover } from './brand.controller.js'
import { upload } from '../../src/middleware/FileUpload/uploads.js'

const brandRouter = express.Router()

brandRouter.get('/brand', getAllBrands)
brandRouter.post('/brand',addBrand)
brandRouter.get('/brand/:id', GetSingleBrand)
brandRouter.put('/brand/:id', updateBrand)
brandRouter.delete('/brand/:id', deleteBrand)
brandRouter.post('/brandCoverUpdate/:id', upload.single('file'), updateBrandCover)
 


export default brandRouter