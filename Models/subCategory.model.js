import mongoose from "mongoose";

const schema = new mongoose.Schema({
    subCategoryName:{
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
    category:{
        type:mongoose.Types.ObjectId,
        ref: 'category'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
    
})
export const subCategoryModel =mongoose.model("subCategory", schema)