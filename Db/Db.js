import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
}
export default connect;
