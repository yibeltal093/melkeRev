const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});


const docClient = new AWS.DynamoDB.DocumentClient();


function retrieveTicketByID(ticket_id){
    const params = {
        TableName: 'tickets',
        Key: {
            ticket_id
        }
    }
    return docClient.get(params).promise();
}
//=================To do ===============
function updateticketStatus(ticket_id, status, reviewer){
    const params = {
        TableName: 'tickets',
        Key: {
            ticket_id
        },
        UpdateExpression: 'set #n = :value, #r = :review',
        ExpressionAttributeNames: {
            '#n': 'status',
            '#r': 'reviewer'
        },
        ExpressionAttributeValues: {
            ':value': status,
            ':review': reviewer
        }
    }
    return docClient.update(params).promise();
}

function viewPreviousSubmisionByUsername(username){
    const params = {
        TableName: 'tickets',
        FilterExpression: "#username = :value",
        ExpressionAttributeNames: {"#username": "author"},
        ExpressionAttributeValues: {
            ':value': username
        }
    }
    return docClient.scan(params).promise();
}
function viewPendingTickets(){
    const params = {
        TableName: 'tickets',
        FilterExpression: "#status = :value",
        ExpressionAttributeNames: {"#status": "status"},
        ExpressionAttributeValues: {
            ':value': 'Pendding'
        }
    }
    return docClient.scan(params).promise();
}
//=====================================

function submitTicket(ticket_id, author, status, amount, description, reviewer){
    const params = {
        TableName: 'tickets',
        Key: {
            ticket_id
        },
        Item: {
            ticket_id,
            status: "Pendding",
            amount,
            description,
            reviewer,
            author: author
        }
    }
    return docClient.put(params).promise();

}



module.exports = {
    retrieveTicketByID,
    submitTicket,
    updateticketStatus,
    viewPendingTickets,
    viewPreviousSubmisionByUsername
}