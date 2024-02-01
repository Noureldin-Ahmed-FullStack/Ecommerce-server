import { userModel } from "../../Models/user.model.js"
import { catchError } from "./catchError.js"

export const checkEmailExist = async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user) return res.json({message: "email already exists!"})
    next()
}

export const GetSingleUser = catchError(async(req,res,next) => {
    let users = await userModel.findById(req.params.id)
    if(!users) return res.json({message: "user doesn't exist!"})
    next()
}) 