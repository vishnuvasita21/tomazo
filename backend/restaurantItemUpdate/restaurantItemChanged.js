const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:836136505875:CustomerOrder'; 

exports.handler = async (event) => {
    
    for (const record of event.Records) {
        
        if (record.eventName === 'MODIFY') {
            const oldImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
            const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);

          
            const message = {
                subject: 'New update for the restaurant',
                body: `Restaurant updated item ${newImage.RestaurantName}`
            };

    
             //publish param
            const publishParams = {
                TopicArn: SNS_TOPIC_ARN,
                Message: message.body,
                Subject: message.subject,
        
            };


            try {
                const publishTextPromise = await sns.publish(publishParams).promise();
                console.log(`Message sent to ${SNS_TOPIC_ARN}`);
                console.log("MessageID " + publishTextPromise.MessageId);
            } catch (err) {
                console.error(err, err.stack);
                return { status: 'Failed to send the message', error: err };
            }
        }
    }
    return { status: 'Processed' };
};
