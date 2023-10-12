const express = require('express');
const router = express.Router();
const jwtUtil = require('../utility/jwt_util');
const uuid = require('uuid');
const userDao = require('../repository/userDao');


const registerUser = async (req, res)=>{
    const body = req.body;
    let employeeRole = body.role;
    
    console.log(body);
    // const existedUser = await userDao.retrieveByUsername(JSON.stringify(body.username));
    // console.log(`current user is: ${existedUser}`);
    if(req.body.valid){
        const currUser = await userDao.retrieveByUsername(req.body.username);
        //console.log(currUser.Item);
        if((currUser.Item)){
            res.statusCode = 400;
            res.send({
                message: `Username already existed with username: ${currUser.Item.username}`
            })
        }else{
            const user = userDao.registerUser(req.body.username, req.body.password, employeeRole)
            .then((data)=>{
                res.statusCode = 201;
                res.send({
                    message: `User successfully created`
                })
            })
            .catch((err)=>{
                console.log(err);
                res.statusCode = 401;
                res.send({
                    message :`Unable to create user`
                })
            })
        }
    }else{
        res.send({
            message :`Invalid inputs`
        })
    }
    
}

const userLogin = (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    userDao.retrieveByUsername(username)
        .then((data)=>{
            const userItem = data.Item;

            if(userItem.password === password){

               // ====== This is a session sign up ============= NOT recomended
                // const currentSession = req.session;
                // currentSession.username = username; //attach username to curr session property
                // currentSession.role = userItem.role; //attach role to curr session property

                const token = jwtUtil.createJWT(userItem.username, userItem.role);
                res.send({
                    message: 'Successfuly Authenticated',
                    token: token
                });
            }else{
                res.statusCode = 400;
                res.send({
                    'message': 'Invalid Credentials'
                })
            }
        })
        .catch((err)=>{
            console.error(err);
            res.send({
                message: 'Faild to authenticate user'
            })
        })
}

const checkUserEndpoint = (req, res)=>{
    //split the main token part to get payload
    const token = req.headers.authorization.split(' ')[1] //['Bearer' '<token>']

    jwtUtil.verifyTokenandReturnPayLoad(token)
        .then((payload)=>{
            if(payload.role === 'user'){
                res.send({
                    message: `Welcome user: ${payload.username}`
                })
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

const checkAdminEndpoint = (req, res)=>{

    const token = req.headers.authorization.split(' ')[1] //['Bearer' '<token>']

    jwtUtil.verifyTokenandReturnPayLoad(token)
        .then((payload)=>{
            if(payload.role === 'admin'){
                res.send({
                    message: `Welcome Admin: ${payload.username}`
                })
            }else{
                res.statusCode = 401;
                res.send({
                    message: `You are not an admin you are: ${payload.role} `
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
//         data: 'Users displayed'
//     });
// });

// router.post('/', (req, res)=>{
//     res.send({
//         data: 'Data created'
//     });
// });

// router.put('/', (req, res)=>{
//     res.send({
//         data: 'Users update'
//     });
// });

router.delete('/', (req, res)=>{
    res.send({
        data: 'Data deleted'
    });
});

module.exports = {
    registerUser,
    userLogin,
    checkUserEndpoint,
    checkAdminEndpoint
}