
import slugify from "slugify"
import { catchError } from "../../src/middleware/catchError.js"
import { brandModel } from "../../Models/brand.model.js"

import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';





const addBrand = catchError(async (req, res) => {
    req.body.slug = slugify(req.body.brandName)
    const brand = await brandModel.create(req.body)
    console.log(brand);
    res.json({ message: "success" })
})
const getAllBrands = catchError(async (req, res) => {
    const brands = await brandModel.find()
    res.json(brands)
})
const GetSingleBrand = catchError(async (req, res, next) => {
    const brand = await brandModel.findById(req.params.id)
    if (!brand) {
        return res.json({ message: "brand doesnt exist" })
    }
    res.json(brand)
})
const updateBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.brandName)
    let Brand =  await brandModel.findByIdAndUpdate(req.params.id, req.body)
    if (!Brand) {
        return res.status(404).json({message:"Brand doesnt exist"})
    }
    res.json({message:"Brand updated"})
})
const deleteBrand = catchError(async (req, res, next) => {
    let Brand =  await brandModel.findByIdAndDelete(req.params.id)
    if (!Brand) {
        return res.status(404).json({message:"Brand doesnt exist"})
    }
    res.json({message:"deleted"})

})

const updateBrandCover = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) { 
            console.log(result); 
            await brandModel.findByIdAndUpdate(req.params.id, { coverImage: result.secure_url })

        });
    res.json(req.file);
})


export {
    addBrand,
    getAllBrands,
    GetSingleBrand,
    updateBrand,
    deleteBrand,
    updateBrandCover
}