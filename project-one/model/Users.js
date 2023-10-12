
const express = require('express');

const app = express();

const userRoute = require('../routes/UserRoute');
const ticketRoute = require('../routes/TicketRoute');

const PORT = 3000;

app.use('/users', userRoute);
app.use('/tickets', ticketRoute)

app.listen(PORT, ()=>{console.log(`Server is listening at port :${PORT}`)});



