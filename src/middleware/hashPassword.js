import bcrypt from "bcrypt"
import joi from "joi"

export const validateShema = (req,res,next)=>{
const signUpSchemaValidation = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    repassword: joi.valid(joi.ref('password')).required(),
    age:joi.number().integer().min(10).required()
})
const validationError = signUpSchemaValidation.validate(req.body)
if (validationError.error) {
    return res.json({error: validationError})
}
next()


}
export const hashPass = (req,res,next)=>{
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
}