import mongoose from "mongoose";
const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    useIn: [
        {
            type: String,
            required: true,
        }
    ],
});
const Phone = mongoose.model("Phone", phoneSchema);
export default Phone;
