const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const restaurantName = event.restaurantName
    const message = 'Sorry! The ' + restaurantName +' is closed for today';
    const subject = 'Restaurant closed!!!'

    const TOPIC_ARN = 'arn:aws:sns:us-east-1:836136505875:CustomerOrder'; 

    const params = {
        Subject: subject,
        Message: message,
        TopicArn: TOPIC_ARN
    };

    try {
        const publishTextPromise = await sns.publish(params).promise();
        console.log("MessageID " + publishTextPromise.MessageId);
        return { status: 'Mail sent successfully' };
    } catch (err) {
        console.error(err, err.stack);
        return { status: 'Failed to send the mail', error: err };
    }
};
