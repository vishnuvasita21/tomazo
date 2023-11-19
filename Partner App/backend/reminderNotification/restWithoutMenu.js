const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const email = event.email;
    const topicArn = 'arn:aws:sns:us-east-1:836136505875:RestSub'; 

    const publishParams = {
        TopicArn: topicArn,
        Message: 'Customer has reservation in about 10 minutes!',
        Subject: 'Customer reservation no menu reminder',
        MessageAttributes: {
            'email': {
                DataType: 'String',
                StringValue: email
            }
        }
    };

    try {
        await sns.publish(publishParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify('Email sent successfully!')
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify('Failed to send reminder email')
        };
    }
};

