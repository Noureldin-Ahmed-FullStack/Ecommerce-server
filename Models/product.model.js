import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type: String,
        unique:[true, 'name is required'],
        trim:true,
        required:true,
        minLength:[2,'name is too short']
    },
    price: {
        type: Number,
        required:true,
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    coverImage:String,
    images:[String],
    brand:{
        type:mongoose.Types.ObjectId,
        ref: 'brand'
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref: 'category'
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref: 'subCategory'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
    
})
export const productModel =mongoose.model("product", schema)