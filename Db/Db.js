import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connect = async () => {
    try {
        await mongoose.connect("mongodb://mamapartstore:akV4y*hWO@103.93.16.46:27017/phonepartmama?authSource=phonepartmama");
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
}
export default connect;
