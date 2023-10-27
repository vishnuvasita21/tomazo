const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let newRestaurants = [];

    event.Records.forEach((record) => {
        if (record.eventName === 'INSERT') {
            let newRestaurantName = record.dynamodb.NewImage.RestaurantName.S;
            let id = record.dynamodb.NewImage.id.S;
            newRestaurants.push({
                'id': id,
                'RestaurantName': newRestaurantName
            });
        }
    });

    if (newRestaurants.length > 0) {
        try {
            for (let restaurant of newRestaurants) {
                const params = {
                    TableName: 'HourlyBatchedRestaurantsList',
                    Item: restaurant
                };
                await dynamodb.put(params).promise();
            }
            return {
                statusCode: 200,
                body: `Successfully added ${newRestaurants.length} new restaurants.`
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: `restaurant data can't be stored: ${error}`
            };
        }
    } else {
        return {
            statusCode: 200,
            body: 'No new restaurants to process.'
        };
    }
};
