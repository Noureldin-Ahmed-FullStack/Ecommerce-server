import mongoose from "mongoose";

const schema = new mongoose.Schema({
    brandName:{
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
    logo:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
    
})
export const brandModel = mongoose.model("brand", schema)