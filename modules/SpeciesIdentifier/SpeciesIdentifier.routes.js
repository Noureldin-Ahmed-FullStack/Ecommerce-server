import express from 'express'
import { upload } from '../../src/middleware/FileUpload/uploads.js'
import { IdentifyImage } from './SpeciesIdentifier.controller.js'
import multer from "multer"

const speciesRouter = express.Router()



 
// speciesRouter.post('/upload/:id',GetSingleUser, upload.single('file'), updateUserPic)
speciesRouter.post('/speciesIdentifier',upload.single('image'),IdentifyImage)


export default speciesRouter