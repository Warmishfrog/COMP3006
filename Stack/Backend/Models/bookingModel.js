import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        UserID: {
            type: String,
            required: true,
        },
        RoomID: {
            type: String,
            required: true,
        },
        NumGuests: {
            type: Number,
            required: true,
        },
        CheckInDate: {
            type: Date,
            required: true
        },
        CheckOutDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: false,        
    }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
