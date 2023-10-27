const AWS = require('aws-sdk');

const sns = new AWS.SNS();

exports.handler = async (event) => {

    //get email from the api payload
    let email;
    const reqBody = JSON.parse(event.body);
    email = reqBody.email;

    //check if email exist or not
    if (!email) {
        throw new Error('No email found');
    }
    
    //create new sub for given email in the topic
    const params = {
        Protocol: 'email',
        TopicArn: 'arn:aws:sns:us-east-1:836136505875:CustomerOrder',
        Endpoint: email,
    };
    
    try {
        const result = await sns.subscribe(params).promise();
        console.log('Subscription:', result.SubscriptionArn);
        return {
            statusCode: 200,
            body: JSON.stringify('Subscription created successfully!'),
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error creating subscription');
    }
};
