import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: false,        
    }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
