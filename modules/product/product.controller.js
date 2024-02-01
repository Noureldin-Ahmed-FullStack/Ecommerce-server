
import slugify from "slugify"
import { catchError } from "../../src/middleware/catchError.js"
import { productModel } from "../../Models/product.model.js"

import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';





const addProduct = catchError(async (req, res) => {
    req.body.slug = slugify(req.body.name)
    const Product = await productModel.create(req.body)
    res.json({ message: "success" })
})
const getAllProducts = catchError(async (req, res) => {
    const Products = await productModel.find()
    res.json(Products)
})
const GetSingleProduct = catchError(async (req, res, next) => {
    const Product = await productModel.findById(req.params.id)
    if (!Product) {
        return res.status(404).json({ message: "Product doesnt exist" })
    }
    res.json(Product)
})
const updateProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let Product = await productModel.findByIdAndUpdate(req.params.id, req.body)
    if (!Product) {
        return res.status(404).json({ message: "Product doesnt exist" })
    }
    res.json({ message: "Product updated" })
})
const deleteProduct = catchError(async (req, res, next) => {
    let Product = await productModel.findByIdAndDelete(req.params.id)
    if (!Product) {
        return res.status(404).json({ message: "Product doesnt exist" })
    }
    res.json({ message: "deleted" })

})

const updateProductCover = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) {
            console.log(result);
            await productModel.findByIdAndUpdate(req.params.id, { coverImage: result.secure_url })

        });
    res.json(req.file);
})

const updateProductImages = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    const imageUrls = [];
    try {
        // Loop through uploaded files and upload them to Cloudinary
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path);
          imageUrls.push(result.secure_url);
        }
    
        // All files uploaded, send response with image URLs
        await productModel.findByIdAndUpdate(req.params.id, { images: imageUrls })
        res.status(200).json({ imageUrls });
      } catch (error) {
        console.error('Error uploading files to Cloudinary:', error);
        res.status(500).json({ error: 'Error uploading files to Cloudinary' });
      }
    });
    


export {
    addProduct,
    getAllProducts,
    GetSingleProduct,
    updateProduct,
    deleteProduct,
    updateProductCover,
    updateProductImages
}