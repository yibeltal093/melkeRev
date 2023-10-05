const express = require('express');
const userRouter = require('./routes/userRoute');

const app = express();

const PORT = 3000;
app.get('/', (req, res)=>{
    res.send({
        message: 'Welcome to home page'
    })
})
app.post('/register', userRouter.registerUser);
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})