import express from 'express';
import Booking from '../Models/bookingModel.js';

const router = express.Router();

// POST
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.UserID ||
            !request.body.RoomID ||
            !request.body.NumGuests ||
            !request.body.CheckInDate ||
            !request.body.CheckOutDate
        ) {
            return response.status(400).send({ message: "Send all required fields: userID, RoomID, NumGuests, CheckInDate, CheckOutDate" });
        }
        const newBooking = {
            UserID: request.body.UserID,
            RoomID: request.body.RoomID,
            NumGuests: request.body.NumGuests,
            CheckInDate: request.body.CheckInDate,
            CheckOutDate: request.body.CheckOutDate,
        };
        const booking = await Booking.create(newBooking);
        return response.status(201).send(booking);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// GET single
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const booking = await Booking.findById(id);
        return response.status(200).json(booking);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// GET all 
router.get('/', async (request, response) => {
    try {
        const bookings = await Booking.find();
        return response.status(200).json({
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// UPDATE
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.userID ||
            !request.body.RoomID ||
            !request.body.NumGuests ||
            !request.body.CheckInDate ||
            !request.body.CheckOutDate
        ) {
            return response.status(400).send({ message: "Send all required fields: userID, RoomID, NumGuests, CheckInDate, CheckOutDate" });
        }
        const { id } = request.params;
        const result = await Booking.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).send({ message: "Booking not found" });
        }
        return response.status(200).send({ message: "Booking updated successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// DELETE
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Booking.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).send({ message: "Booking not found" });
        }
        return response.status(200).send({ message: "Booking deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export { router as default };
