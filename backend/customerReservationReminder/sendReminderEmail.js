const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const email = event.email;
    const topicArn = 'arn:aws:sns:us-east-1:836136505875:CustomerOrder'; 

    const publishParams = {
        TopicArn: topicArn,
        Message: 'Your reservation is in 30 minutes!',
        Subject: 'Reservation Reminder',
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
