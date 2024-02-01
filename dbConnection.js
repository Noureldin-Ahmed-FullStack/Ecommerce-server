import mongoose from "mongoose";

export function dbConnection() {
    return mongoose.connect('mongodb://0.0.0.0:27017/assignment10').then(()=>{
        console.log("assignment10 DB connected");
    }).catch((err)=>{
        console.log("DB error "+err);
    })
}