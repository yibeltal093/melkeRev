const AWS = require('aws-sdk');


//require('aws-sdk/lib/maintenance_mode_message').suppress = true;

AWS.config.update({
    region: 'us-east-1'
})

const daoClient = new AWS.DynamoDB.DocumentClient();


function addGroceryItem(grocery_item_id, name, quantity, price, purchesed){
    const params = {
        TableName: 'grocery_items',
        Key: {
            grocery_item_id: "id"
        },
        Item: {
            grocery_item_id,
            name,
            quantity,
            price,
            purchesed
        }
    }
    return daoClient.put(params).promise();
 
};

//Retrive all items in the table

function retrieveAllGroceryItems(){
    
    const params = {
        TableName: 'grocery_items',
       // Key: {grocery_item_id: "id"}
    }
    return daoClient.scan(params).promise();
}


//Retrieve Grocery items by Id  grocery_item_id

function retrieveGroceryItemById(itemId){
    
    const params = {
        TableName: 'grocery_items',
        Key: {grocery_item_id: itemId}
    }
    return daoClient.get(params).promise();
}

function deleteGroceryItemById(itemId){
    
    const params = {
        TableName: 'grocery_items',
        Key: {grocery_item_id: itemId}
    }
    return daoClient.delete(params).promise();
}

function updateGroceryItemName(grocery_item_id, itemName){
    const params = {
        TableName: 'grocery_items',
        Key: {
            grocery_item_id
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'name'
        },
        ExpressionAttributeValues: {
            ':value': itemName
        }
    }
    return daoClient.update(params).promise();
}

function updateMultipleAttributes(itemId, name, price){
    const params = {
        TableName: 'grocery_items',
        Key: {
            itemId
        },
        UpdateExpression: 'set #n = :name, #price = :price',
        ExpressionAttributeNames: {
            '#n': 'name',
            '#price': 'price',
        },
        ExpressionAttributeValues: {
            ':name': name,
            ':price': price,
        }
    }

    return daoClient.update(params).promise();
}



module.exports = {
    addGroceryItem,
    retrieveGroceryItemById,
    retrieveAllGroceryItems,
    deleteGroceryItemById,
    updateGroceryItemName,
    updateMultipleAttributes
}