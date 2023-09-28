const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ticketRouter = require('./routes/TicketRoute');
const userRouter = require('./routes/UserRoute');

const app = express();

const PORT = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret :'secret',
    saveUninitialized: true,
    resave: false
}));

//Check if the item is valid
function validateNewUser(req, res, next){
    if(!req.body.username || !req.body.password || !req.body.role){
        req.body.valid = false;
        next();
    }
    else{
        req.body.valid = true;
        next();
    }
}
function isTicketValid(req, res, next){
    if(!req.body.amount){
        res.send({
            message: 'Amount is required'
        })
        req.body.valid = false;
        next();
    }else if(!req.body.description){
        res.send({
            message: 'Description is required'
        })
        req.body.valid = false;
        next();
    }else{
        req.body.valid = true;
        next();
    }
}



app.get('/tickets/:id', ticketRouter.findTicketById);
app.get('/ticket-user/:user', ticketRouter.findTicketByUsername);


app.get('/ticket-status/', ticketRouter.findPenddingTickets);


app.put('/ticket/update/:id', ticketRouter.updateTicketStatus);

app.post('/submit-ticket', isTicketValid, ticketRouter.submitTicket)

app.post('/register', validateNewUser, userRouter.registerUser);

app.post('/login', userRouter.userLogin);

app.get('/userEndpoint', userRouter.checkUserEndpoint)


app.get('/adminEndpoint', userRouter.checkAdminEndpoint);

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})