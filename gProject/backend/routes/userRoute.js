const express = require('express');
const router = express.Router();

const registerUser = async (req, res)=>{
    const body = req.body;
    
    console.log(body);
    res.send({
        message: 'Item is created'
    })
    
}

module.exports = {
    registerUser
}