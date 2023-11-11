const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge();
const lambda = new AWS.Lambda();

exports.handler = async (event) => {

    //email and reservation time payload
    const body = JSON.parse(event.body);
    const email = body.email;
    const reservationTime = new Date(body.reservation);

    // Calculating 30 minutes before the reservation time
    reservationTime.setMinutes(reservationTime.getMinutes() - 30);


    //new rule name creation that trigger on calculated time
    const ruleName = 'ReservationReminder_' + event.requestContext.requestId;

    //Creating new EventBridge rule
    const putRuleParams = {
        Name: ruleName,
        ScheduleExpression: `cron(${reservationTime.getMinutes()} ${reservationTime.getHours()} ${reservationTime.getDate()} ${reservationTime.getMonth() + 1} ? ${reservationTime.getFullYear()})`, // cron(minute hour day month ? year)
        State: 'ENABLED'
    };

    try {
        const ruleResponse = await eventbridge.putRule(putRuleParams).promise();

        //Invocation of second Lambda function permission
        const lambdaPermissionParams = {
            FunctionName: 'secondSchedule', //second Lambda function
            StatementId: event.requestContext.requestId,
            Action: 'lambda:InvokeFunction', //Invocation
            Principal: 'events.amazonaws.com',
            SourceArn: ruleResponse.RuleArn
        };
        await lambda.addPermission(lambdaPermissionParams).promise();

        //Target Lambda to the EventBridge rule
        const putTargetsParams = {
            Rule: ruleName,
            Targets: [{
                Id: '1',
                Arn: 'arn:aws:lambda:us-east-1:836136505875:function:secondSchedule',
                Input: JSON.stringify({ email: email }),
            }]
        };
        await eventbridge.putTargets(putTargetsParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify('Reminder scheduled successfully!')
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify('Failed to create scheduled reminder')
        };
    }
};
