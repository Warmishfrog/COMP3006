import express from 'express';
import Room from '../Models/roomModel.js';

const router = express.Router();

//POST
router.post('/', async (request, response) => {
    try
    {
        if 
        (
            !request.body.name ||
            !request.body.price ||
            !request.body.capacity
        ) 
        {
            return response.status(400).send({message: "Send all required fields: name, price, capacity"});
        }
         const newRoom = { 
            name: request.body.name,
            price: request.body.price, 
            capacity: request.body.capacity, 
        }; 
        const room = await Room.create(newRoom);
        return response.status(201).send(room);
    }
    catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// GET single by id
router.get('/:id', async (request, response) => {
    try
    {
        const {id} = request.params;
        
        const rooms = await Room.findById(id);
        return response.status(200).json(rooms);
    
    }
    catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//GET all 
router.get('/', async (request, response) => {
    try
    {
        const rooms = await Room.find();
        return response.status(200).json({
            count: rooms.length,
            data: rooms
        });
    }
    catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//UPDATE
router.put('/:id', async (request, response) => {
    try
    {
        if 
        (
            !request.body.name || 
            !request.body.price ||
            !request.body.capacity
        ) 
        {
            return response.status(400).send({message: "Send all required fields: name, price, capacity"});
        }
        const {id} = request.params;
        const result = await Room.findByIdAndUpdate(id, request.body);
        if (!result)
        {
            return response.status(404).send({message: "Room not found"});
        }
        return response.status(200).send({message: "Room updated successfully"});
    }
    catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//DELETE
router.delete('/:id', async (request, response) => {
    try
    {
        const {id} = request.params;
        const result = await Room.findByIdAndDelete(id);
        if (!result)
        {
            return response.status(404).send({message: "Room not found"});
        }
        return response.status(200).send({message: "Room deleted successfully"});
    }
    catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export { router as default} ;