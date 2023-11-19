import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
mongoose.set("strictQuery", true);

const connection = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL environment variable is not defined");
    }
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connection established")
    } catch (error) {
        console.log(error);
    }
};

export default connection;