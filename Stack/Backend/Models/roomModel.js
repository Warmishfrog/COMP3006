import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true
        },
        size: {
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