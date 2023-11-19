const AWS = require('aws-sdk');

const sns = new AWS.SNS();

exports.handler = async (event) => {
    let email;
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify('No data in the body!'),
        };
    }

    try {
        const reqBody = JSON.parse(event.body);
        email = reqBody.email;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify('No email found!'),
        };
    }
    
    //create SNS sub for given email
    const params = {
        Protocol: 'email',
        TopicArn: 'arn:aws:sns:us-east-1:836136505875:RestSub',
        Endpoint: email,
    };
    
    try {
        const result = await sns.subscribe(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify('Subscription created successfully!'),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
