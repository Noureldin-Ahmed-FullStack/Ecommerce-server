import { userModel } from "../../Models/user.model.js"
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import { sendEmail } from "../../mail/sendMail.js"
import jwt from "jsonwebtoken"
import { catchError } from "../../src/middleware/catchError.js"
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
const warframUrl = 'https://www.wolframcloud.com/obj/407c7a68-d5d0-4a90-b115-e4d143b56338'


async function wolfram(imageUrl) {
    try {
        const response = await axios.get(`${warframUrl}?url=` + encodeURIComponent(imageUrl));
        return response.data; // Assuming the API returns JSON data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const IdentifyImage = catchError(async (req, res) => {
    let ImageUrl
    // console.log(req.file);
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    await cloudinary.uploader.upload(req.file.path,
        { public_id: req.file.originalname },
        async function (error, result) {
            console.log(result.secure_url);
            // await userModel.findByIdAndUpdate(req.params.id, { profilePicture: result.secure_url })
            ImageUrl = result.secure_url
        });
        const wolframResult = await wolfram(ImageUrl)
    console.log(wolframResult); 
    res.json({identification: wolframResult ,url: ImageUrl});
})

export {

    IdentifyImage,
}