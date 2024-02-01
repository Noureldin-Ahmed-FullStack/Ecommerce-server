import express from 'express'
import { GetSingleCategory, addCategory, deleteCategory, getAllCategories, updateCategory, updateCategoryCover } from './category.controller.js'
import { upload } from '../../src/middleware/FileUpload/uploads.js'

const categoryRouter = express.Router()

categoryRouter.get('/category', getAllCategories)
categoryRouter.post('/category',addCategory)
categoryRouter.get('/category/:id', GetSingleCategory)
categoryRouter.put('/category/:id', updateCategory)
categoryRouter.delete('/category/:id', deleteCategory)
categoryRouter.post('/categoryCoverUpdate/:id', upload.single('file'), updateCategoryCover)
 


export default categoryRouter