import mongoose from "mongoose";

const schema = new mongoose.Schema({
   
    code:{
        type:String,
        trim:true,
        required:true
    },
    expires: Date,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
    
})
export const couponModel =mongoose.model("coupon", schema)