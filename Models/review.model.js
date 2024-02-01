import mongoose from "mongoose";

const schema = new mongoose.Schema({
    
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
    
})
export const reviewModel =mongoose.model("review", schema)