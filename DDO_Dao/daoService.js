const groceryItemDao = require('./repository/grocery_api_dao');
const express = require('express');
const app = express();
const PORT = 3000;

const uuid = require('uuid');
const bodyParser = require('body-parser');
const { RolesAnywhere } = require('aws-sdk');

app.use(bodyParser.json());


app.get('/',(req, res)=>{
    res.send('Hello World');
})


//Check if the item is valid
function validateNewItem(req, res, next){
    if(!req.body.name || !req.body.quantity || !req.body.price){
        req.body.valid = false;
        next();
    }
    else{
        req.body.valid = true;
        next();
    }
}


//Add Item to the repository
app.post('/api/addItem', validateNewItem, (req, res)=>{
    
    const body = req.body;
    if(req.body.valid){
        const item = groceryItemDao.addGroceryItem(uuid.v4(), body.name, 
        body.quantity, body.price, body.purchesed)
        .then((data)=>{
            res.status(200);
            res.send({
                message: 'Successfully Item added.'
            })
        })
        .catch((err)=>{
            res.status(500);
            res.send({
                message: 'Failed to add an item. Database connection error'
            })
        })
    }else{
        res.status(400);
        res.send({
            message: 'Invalid item property',
        })
    }
})


app.get('/api/getItem', async(req, res)=>{
    //const itemId = req.params.id; //465b93fc-e58a-458f-9312-088ebef2ec52

    try{
        const getItem = await groceryItemDao.retrieveAllGroceryItems();
        res.status(200);
        res.send({
            AllItems: getItem
        })
    }catch(error){
        console.error(error);
        res.status(500).json({Error: 'Something Went wrong.'});
    }
})



app.get('/api/getItem/:id', async(req, res)=>{
    const itemId = req.params.id; //465b93fc-e58a-458f-9312-088ebef2ec52

    try{
        const getItem = await groceryItemDao.retrieveGroceryItemById(itemId);
        res.status(200);
        res.send({
            GroceryItem: getItem,
            message: `Item with id ${itemId} is retrieved`

        })
    }catch(error){
        console.error(error);
        res.status(500).json({Error: 'Something Went wrong.'});
    }
})


app.delete('/api/deleteItem/:id', async(req, res)=>{
    const itemId = req.params.id; //465b93fc-e58a-458f-9312-088ebef2ec52

    try{
        const getItem = await groceryItemDao.deleteGroceryItemById(itemId);
        res.status(200);
        res.send({
            message: 'Item successfully deleted'
        })
    }catch(error){
        console.error(error);
        res.status(500).json({Error: 'Something Went wrong.'});
    }
})


app.put('/api/update/:id', (req, res)=>{
    const item = req.body;
    const itemId = req.params.id;
    try{
        const updateItem = groceryItemDao.updateGroceryItemName(itemId, item.name);
        res.send(updateItem);
    }catch(error){
        console.error(error);
        res.status(500).json({Error: 'Something Went wrong.'});
    }
})

// app.put('/api/updateMultiple/:id', async (req, res)=>{
//     const itemId = req.params.id;
//     const prevItem = await groceryItemDao.retrieveGroceryItemById(itemId);
//     console.log(prevItem);
//     const item = req.body;
//     let newName = "";
//     let newPrice = 0;
//     if(!item.name){
//         newName = prevItem.name;
//     }else{
//         newName = item.name;
//     }
//     if(!item.price){
//         newPrice = prevItem.price;
//     }else{
//         newPrice = item.price;
//     }

    
//     try{
//         const updateItem = await groceryItemDao
//         .updateMultipleAttributes(itemId, newName, newPrice);
//         res.send(updateItem);
//     }catch(error){
//         console.error(error);
//         res.status(500).json({Error: 'Something Went wrong.'});
//     }
// })

app.listen(PORT, ()=>{
    console.log(`Server is listening at port :${PORT}`);
})