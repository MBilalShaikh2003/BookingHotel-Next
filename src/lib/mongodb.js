import mongoose from "mongoose";

export const connectMongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongodb")
    } catch (error) {
        console.log("error occured",error)
    }
}

