const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});


const docClient = new AWS.DynamoDB.DocumentClient();


function retrieveTicketByID(ticket_id){
    const params = {
        TableName: 'tickets',
        Key: {
            ticket_id,
            status: 'approved'
        }
    }
    return docClient.get(params).promise();
}
//=================To do ===============
function updateTickets(){}
function employeeFaildProcess(){}
function viewPreviousSubmisionByEmail(){}
//=====================================

function submitTicket(ticket_id, status, amount, description, reviewer, user){
    const params = {
        TableName: 'tickets',
        Key: {
            ticket_id
        },
        Item: {
            ticket_id,
            status,
            amount,
            description,
            reviewer,
            user
        }
    }
    return docClient.put(params).promise();

}

function updateticketStatus(id, status){
    const params = {
        TableName: 'tickets',
        Key: {
            ticket_id: id
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'status'
        },
        ExpressionAttributeValues: {
            ':value': status
        }
    }
    return docClient.update(params).promise();
}

module.exports = {
    retrieveTicketByID,
    submitTicket,
    updateticketStatus
}