const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let restID;
    try {
        const body = JSON.parse(event.body);
        restID = body.restId;
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid" })
        };
    }

    const params = {
        TableName: "HolisticView",
        FilterExpression: "restID = :restIdVal",
        ExpressionAttributeValues: {
            ":restIdVal": restID.toString()
        }
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
    } catch (err) {
        console.error("Error", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Server Error" })
        };
    }
};
