const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

const mostOccurringItems = async () => {
    const params = {
        TableName: 'reservations',
        ProjectionExpression: 'menu'
    };

    const data = await dynamoDb.scan(params).promise();
    const wordCount = {};

    data.Items.forEach((item) => {
        const menu = item.menu;
        if (wordCount[menu]) {
            wordCount[menu]++;
        } else {
            wordCount[menu] = 1;
        }
    });

  
    const topThreeItems = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map((item) => item[0]);

    return topThreeItems;
};

const sendMail = async (topThreeItems) => {
    const message = `Most ordered items by the customers are: ${topThreeItems.join(', ')}.`;
    const params = {
        Message: message,
        Subject: 'Top Three Menu Items',
        TopicArn: 'arn:aws:sns:us-east-1:836136505875:RestSub' 
    };

    await sns.publish(params).promise();
};

exports.handler = async (event) => {
    const topThreeItems = await mostOccurringItems();
    await sendMail(topThreeItems);
};
