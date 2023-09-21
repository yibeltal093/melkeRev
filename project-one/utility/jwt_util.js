const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

function createJWT(username, role){
    return jwt.sign({
        username,
        role 
    }, 'thisisasecret', { //Secret code 
        expiresIn: '1d'  //jwt expires in one day
    })
}

//(header + payload) sign with the secret -> signature 'thisisasecret'

/**
 * The JWT will be send to the client. When the client sends the JWT back to the server
 * the server needs to check if the JWT is valid. (Header + payload + signature) ->
 * We need to verify that the signature was generated using our secret
 * You can not forge any of the information inside of the payload or header,
 * The server will know that and denied authentication
 */

jwt.verify = Promise.promisify(jwt.verify); //Turn jwt.verify into a function that returns a promise

function verifyTokenandReturnPayLoad(token){
    return jwt.verify(token, 'thisisasecret');
}

module.exports = {
    createJWT,
    verifyTokenandReturnPayLoad
}