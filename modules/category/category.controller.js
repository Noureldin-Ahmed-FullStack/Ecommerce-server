
import slugify from "slugify"
import { catchError } from "../../src/middleware/catchError.js"
import { categoryModel } from "../../Models/category.model.js"

import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';

const addCategory = catchError(async (req, res) => {
    req.body.slug = slugify(req.body.categoryName)
    const category = await categoryModel.create(req.body)
    console.log(category);
    res.json({ message: "success" })
})
const getAllCategories = catchError(async (req, res) => {
    const categorys = await categoryModel.find()
    res.json(categorys)
})
const GetSingleCategory = catchError(async (req, res, next) => {
    const Category = await categoryModel.findById(req.params.id)
    if (!Category) {
        return res.json({ message: "Category doesnt exist" })
    }
    res.json(Category)
})
const updateCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.categoryName)
    let category =  await categoryModel.findByIdAndUpdate(req.params.id, req.body)
    if (!category) {
        return res.status(404).json({message:"Category doesnt exist"})
    }
    res.json({message:"category updated"})
})
const deleteCategory = catchError(async (req, res, next) => {
    let category =  await categoryModel.findByIdAndDelete(req.params.id)
    if (!category) {
        return res.status(404).json({message:"Category doesnt exist"})
    }
    res.json({message:"deleted"})

})

const updateCategoryCover = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) { 
            console.log(result); 
            await categoryModel.findByIdAndUpdate(req.params.id, { coverImage: result.secure_url })

        });
    res.json(req.file);
})

export {
    addCategory,
    getAllCategories,
    GetSingleCategory,
    updateCategory,
    deleteCategory,
    updateCategoryCover
}