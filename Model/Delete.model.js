import mongoose from "mongoose";
const deleteSchema = new mongoose.Schema({
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
    PhoneData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phone',
    },
  
}, {
    timestamps: true,
});
const Delete = mongoose.model('Delete', deleteSchema);
export default Delete;
