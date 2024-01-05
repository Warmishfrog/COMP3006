import express from 'express';
import Account from '../Models/accountModel.js';

const router = express.Router();

//POST
router.post('/', async (request, response) => {
    try
    {
        if 
        (
            !request.body.username ||
            !request.body.password 
        ) 
        {
            return response.status(400).send({message: "Send all required fields: username, password"});
        }
         const newAccount = { 
            username: request.body.username,
            password: request.body.password
        }; 
        const account = await Account.create(newAccount);
        return response.status(201).send(account);
    }
    catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// GET single by id
router.get('/id/:id', async (request, response) => {
    try
    {
        const {id} = request.params;
        
        const account = await Account.findById(id);
        return response.status(200).json(account);
    
    }
    catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});
// GET single by username
router.get('/user/:username', async (request, response) => {
    try
    {
        const account = await Account.find({username: request.params.username});
        
        return response.status(200).json(account);
    
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
        const accounts = await Account.find();
        return response.status(200).json({
            count: accounts.length,
            data: accounts
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
            !request.body.username || 
            !request.body.password
        ) 
        {
            return response.status(400).send({message: "Send all required fields: username, password"});
        }
        const {id} = request.params;
        const result = await Account.findByIdAndUpdate(id, request.body);
        if (!result)
        {
            return response.status(404).send({message: "Account not found"});
        }
        return response.status(200).send({message: "Account updated successfully"});
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
        const result = await Account.findByIdAndDelete(id);
        if (!result)
        {
            return response.status(404).send({message: "Account not found"});
        }
        return response.status(200).send({message: "Account deleted successfully"});
    }
    catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export { router as default} ;