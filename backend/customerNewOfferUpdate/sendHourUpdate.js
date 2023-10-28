const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const dynamodb = new AWS.DynamoDB.DocumentClient();

//temp table data
const TABLE_NAME = 'HourlyBatchedRestaurantsList';
const SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:836136505875:CustomerOrder';

exports.handler = async (event) => {
    //get all the data
    let scannedRestaurants = [];
    let lastEvaluatedKey = null;

    do {
        const params = {
            TableName: TABLE_NAME,
            ExclusiveStartKey: lastEvaluatedKey
        };

        const scanResult = await dynamodb.scan(params).promise();
        scannedRestaurants = scannedRestaurants.concat(scanResult.Items);
        lastEvaluatedKey = scanResult.LastEvaluatedKey;

    } while (lastEvaluatedKey);

    if (scannedRestaurants.length === 0) {
        return { status: 'No new restaurants to sent' };
    }

    //lists of restaurants to be sent
    const message = {
        subject: 'Hey new restaurants got added visit website to check.',
        body: `New restaurants: ${JSON.stringify(scannedRestaurants)}`
    };

    //publish param
    const publishParams = {
        TopicArn: SNS_TOPIC_ARN,
        Message: message.body,
        Subject: message.subject,
        
    };

    try {
        const publishTextPromise = await sns.publish(publishParams).promise();
        console.log("MessageID " + publishTextPromise.MessageId);

        for (let restaurant of scannedRestaurants) {
            const deleteParams = {
                TableName: TABLE_NAME,
                Key: {
                    id: restaurant.id
                }
            };

            await dynamodb.delete(deleteParams).promise();
        }

        return { status: 'Message sent' };
    } catch (err) {
        console.error(err, err.stack);
        return { status: 'Failed to process', error: err };
    }
};
