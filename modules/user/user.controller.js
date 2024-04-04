import { userModel } from "../../Models/user.model.js"
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import { sendEmail } from "../../mail/sendMail.js"
import jwt from "jsonwebtoken"
import { catchError } from "../../src/middleware/catchError.js"
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';





const ContactMe = catchError(async (req, res) => {
    const user = await req.body
    try {        
        await sendEmail(user.name,user.email,user.phone,user.message,user.reciver)
    } catch (error) {
        res.json({ message: "Error", error:error })        
    }
    res.json({ message: "success" })
})

const signUp = catchError(async (req, res) => {

    const user = await userModel.create(req.body)
    console.log(user._id);
    // sendEmail(user._id,user.email)
    res.json({ message: "success" })
})
const getAllUsers = catchError(async (req, res) => {
    const users = await userModel.find()
    res.json(users)
})
export const GetSingleUser = catchError(async (req, res, next) => {
    const users = await userModel.findById(req.params.id)
    if (!users) {
        return res.json({ message: "user doesnt exist" })
    }
    next()
})
export const GetSingleUserRes = catchError(async (req, res, next) => {
    const users = await userModel.findById(req.params.id).populate('wishlist')
    if (!users) {
        return res.json({ message: "user doesnt exist" })
    }
    res.json({ message: users })
})
const Validate = catchError(async (req, res) => {
    await userModel.findByIdAndUpdate(req.params.id, {
        Validated: true
    })
    res.json({ message: "Validated" })
})
const signIn = catchError(async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    console.log(user);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ uid: user._id, email: user.email }, 'key')
        return res.json({ message: "hello " + user.name, token })
    }

    return res.json({ message: "Email or password is incorrect!" })
    // if (user.Validated) {
    //     if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //         let token = jwt.sign({ uid: user._id, email: user.email }, 'key')
    //         return res.json({ message: "hello " + user.name, token })
    //     }

    //     return res.json({ message: "Email or password is incorrect!" })
    // } else { return res.json({ message: "Email not validated" }) }

})
const verify = catchError((req, res) => {
    jwt.verify(req.params.token, 'key', async (err, decoded) => {
        if (err) return res.json(err)
    }
    )
})


const updateUserPic = catchError(async (req, res) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) { 
            console.log(result); 
            await userModel.findByIdAndUpdate(req.params.id, { profilePicture: result.secure_url })

        });
    res.json(req.file);
})
const addtoWishlist = catchError(async (req, res) => {
    let decoded = jwt.verify(req.headers.token, 'key');
    let wishlist = await userModel.findByIdAndUpdate(decoded.uid, {$addToSet :{wishlist:req.body.product} },{new:true})
    if (!wishlist) {
        return res.json({message: "wishlist not found"})
    }
    res.json({message: "success"})
})


export {
    signUp,
    signIn,
    getAllUsers,
    Validate,
    updateUserPic,
    addtoWishlist,
    ContactMe
}