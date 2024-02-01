import mongoose from "mongoose";

const schema = new mongoose.Schema({
    categoryName:{
        type: String,
        unique:[true, 'name is required'],
        trim:true,
        required:true,
        minLength:[2,'name is too short']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    },
    coverImage: String
    
})
export const categoryModel =mongoose.model("category", schema)