const express = require('express');
const router = express.Router();
const userDao = require('../repository/userDao');
const ticketDao = require('../repository/TicketDao');
const jwtUtil = require('../utility/jwt_util');
const uuid = require('uuid');
let pendingTickets = new Set();


function isObjectEmpty(obj){
    for(const prop in obj){
        if(Object.hasOwn(obj, prop)){
            return false;
        }
    }
    return true;
}

const findTicketById = async (req, res)=>{
    const ticketID = req.params.id;

    try{
    
        const ticket = await ticketDao.retrieveTicketByID(ticketID);
        console.log(ticket);
        if(!isObjectEmpty(ticket)){
            res.send({
                Ticket: ticket,
                message: 'Ticket is displayed'
            });
        }else{

            res.status(400);
            res.send("Tikcet not found");
        }
    }catch(error){
        res.status(400);
        res.send("Server issue");
    } 
    
}

const findTicketByUsername = async (req, res)=>{
    const user = req.params.user;
    try{
        const userTikcet = await ticketDao.viewPreviousSubmisionByUsername(user);
        res.send({
            Ticket: userTikcet,
            message: `Tickets with status: `
        });
    }catch(error){
        console.log(error);
        res.status(400);
    }
}

const findPenddingTickets = async (req, res)=>{
    try{
        const ticketStatus = await ticketDao.viewPendingTickets();
        res.send({
            Ticket: ticketStatus,
            message: `Tickets with status: ${ticketStatus}`
        });
    }catch(error){
        console.log(error);
        res.status(400);
    }
}

const updateTicketStatus = async (req, res)=>{
    const ticketid = req.params.id;
    const ticketStatus = await ticketDao.viewPendingTickets();
    for(let i = 0; i < ticketStatus.Items.length; i++){
        pendingTickets.add(ticketStatus.Items[i].ticket_id);
    }
    
    const currentTicket = await ticketDao.retrieveTicketByID(ticketid);
    
    
    const token = req.headers.authorization.split(' ')[1]; //['Bearer' '<token>']
    jwtUtil.verifyTokenandReturnPayLoad(token)
        .then((payload)=>{
            if(!isObjectEmpty(currentTicket)){
                if(!pendingTickets.has(ticketid)){
                    res.send({
                        message: `This ticket is already reviewed`
                    })
                }else if(req.body.status !== "Denied" && req.body.status !== "Approved"){
                    res.send({
                        message: `you can not be updated with status: ${req.body.status}`
                    });
                }else if(payload.role === 'admin'){
                    
                    username = payload.username;
                        const ticket =  ticketDao.updateticketStatus(ticketid, req.body.status, username);
                        res.send({
                            message: `Ticket was reviewed and status changed to: ${req.body.status}`
                        });
                        pendingTickets.delete(ticketid);
                }else{
                    res.statusCode = 401;
                    res.send({
                        message: `You are not an admin you are: ${payload.role} `
                    })
                }
            }else{
                res.send({
                    message: 'There is no ticke with this id'
                })
            }
        })
        .catch((err)=>{
            console.error(err);
            res.statusCode = 401;
            res.send({
                message: 'Faild to Authenticate Token'
            })
        })
}

const submitTicket = (req, res)=>{
    const body = req.body;
    let username = req.body.username;
    const token = req.headers.authorization.split(' ')[1] //['Bearer' '<token>']
    jwtUtil.verifyTokenandReturnPayLoad(token)
        .then((payload)=>{
            if(payload.role === 'user'){
                username = payload.username;
                if(req.body.valid){
                    const currId = (uuid.v4());
                    //storePenddingTickets(currId);
                    const ticket = ticketDao.submitTicket(currId, username, req.body.status,
                     req.body.amount, req.body.description, req.body.reviewer)
                        .then((data)=>{
                            res.statusCode = 201;
                            res.send({
                                message: 'ticket is successfully submitted.'
                            })
                        })
                        .catch((err)=>{
                            res.statusCode = 400;
                            res.send({
                                Ticket: ticket,
                                message: 'ticket could not be submited'
                            })
                        })
                    }
            }else{
                res.statusCode = 401;
                res.send({
                    message: `You are not a user you are: ${payload.role} `
                })
            }
        })
        .catch((err)=>{
            console.error(err);
            res.statusCode = 401;
            res.send({
                message: 'Faild to Authenticate Token'
            })
        })
   
}
// router.get('/', (req, res)=>{
//     res.send({
//         data: 'Tickets displayed'
//     });
// });


module.exports = {
    findTicketById,
    findTicketByUsername,
    findPenddingTickets,
    updateTicketStatus,
    submitTicket
}