const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const userDao = require('./repository/userDao');
// const ticketDao = require('./repository/TicketDao');
// const jwtUtil = require('./utility/jwt_util');
// const uuid = require('uuid');
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


app.get('/ticket-status/:status', ticketRouter.findTicketByStatus);


app.put('/ticket/update/:id', ticketRouter.updateTicketStatus);

app.post('/submit-ticket', isTicketValid, ticketRouter.submitTicket)

app.post('/register', validateNewUser, userRouter.registerUser);

app.post('/login', userRouter.userLogin);

app.get('/userEndpoint', userRouter.checkUserEndpoint)


app.get('/adminEndpoint', userRouter.checkAdminEndpoint)
// app.get('/employeeEndPoint', (req, res)=>{
//     const currentSession = req.session;

//     if(currentSession.username && currentSession.role){
//         if(currentSession.role === 'user'){
//             res.send({
//                 "message": `Welcome employee ${currentSession.username}`
//             });
//         }else{
//             res.statusCode = 401;
//             res.send({
//                 "message": 'You are not an employee!'
//             })
//         }
//     }else{
//         res.statusCode = 401;
//             res.send({
//                 "message": 'You are not Loged in!'
//             })
//     }
// });

// app.get('/employeeEndPoint', (req, res)=>{
//     const currentSession = req.session;

//     if(currentSession.username && currentSession.role){
//         if(currentSession.role === 'admin'){
//             res.send({
//                 "message": `Welcome admin ${currentSession.username}`
//             });
//         }else{
//             res.statusCode = 401;
//             res.send({
//                 "message": 'You are not an Admin!'
//             })
//         }
//     }else{
//         res.statusCode = 401;
//             res.send({
//                 "message": 'You are not Loged in!'
//             })
//     }
// });

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})