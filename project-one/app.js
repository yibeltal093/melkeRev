const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userDao = require('./repository/userDao');
const jwtUtil = require('./utility/jwt_util');

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
function validateNewItem(req, res, next){
    if(!req.body.username || !req.body.password || !req.body.role){
        req.body.valid = false;
        next();
    }
    else{
        req.body.valid = true;
        next();
    }
}

app.post('/register', validateNewItem, async (req, res)=>{
    const body = req.body;
    console.log(body);
    // const existedUser = await userDao.retrieveByUsername(JSON.stringify(body.username));
    // console.log(`current user is: ${existedUser}`);
    if(req.body.valid){
        const currUser = await userDao.retrieveByUsername(req.body.username);
        //console.log(currUser.Item);
        if((currUser.Item)){
            res.statusCode = 400;
            res.send({
                message: `Item already existed with username: ${currUser.Item.username}`
            })
        }else{
            const user = userDao.registerUser(req.body.username, req.body.password, req.body.role)
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
    }
    
});

app.get('/', (req, res)=>{
    res.send('running');
});

app.post('/login', (req, res)=>{
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
})

app.get('/employeeEndpoint', (req, res)=>{
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
})


app.get('/adminEndpoint', (req, res)=>{

    const token = req.header.authorization.split(' ')[1] //Takes second part of the split

    jwtUtil.verifyTokenandReturnPayLoad(token)
        .then((payload)=>{
            if(payload.role === 'admin'){
                res.send({
                    message: `Welcome Admin: ${payload.username}`
                })
            }else{
                res.statusCode = 401;
                res.send({
                    message: `You are not an admin, you are a ${payload.role}`
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            res.statusCode = 401;
            res.send({
                message: `Failed to authenticate Token`
            })
        })
})
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