const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});


const docClient = new AWS.DynamoDB.DocumentClient();

function retrieveByUsername(username){
    const params = {
        TableName: 'userTable',
        Key: {
            username
        }
    }
    return docClient.get(params).promise();
}

function registerUser(username, password, role){
    const params = {
        TableName: 'userTable',
        Key: {
            username
        },
        Item: {
            username,
            password,
            role: "user"
        }
    }
    return docClient.put(params).promise();

}

module.exports = {
    retrieveByUsername,
    registerUser
}
