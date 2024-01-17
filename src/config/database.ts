import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
mongoose.set("strictQuery", true);

const connection = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL environment variable is not defined");
    }
    try { 
        await mongoose.connect("mongodb+srv://codenestcreation:Shashikant%40029@cluster0.rffa8d1.mongodb.net/security_management")
        console.log("Database connection established")
    } catch (error) {
        console.log(error);
    }
};

export default connection;