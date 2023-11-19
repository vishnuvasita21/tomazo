const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge();
const lambda = new AWS.Lambda();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const email = body.email;
    const reservationTime = new Date(body.reservation);
    const isMenu = body.menu;
    const restEmail = body.restEmail;

   //event time scheduled for 60 mins before the reservation time
    reservationTime.setUTCMinutes(reservationTime.getUTCMinutes() - 60);

    const toTwoDigits = (num) => num.toString().padStart(2, '0');

    //cron expression for the event schedular
    const cronExpression = `cron(${toTwoDigits(reservationTime.getUTCMinutes())} ${toTwoDigits(reservationTime.getUTCHours())} ${toTwoDigits(reservationTime.getUTCDate())} ${toTwoDigits(reservationTime.getUTCMonth() + 1)} ? ${reservationTime.getUTCFullYear()})`;


    try {
        //CUSTOMER REMINDER
        const custRuleName = 'CustReservationReminder_' + event.requestContext.requestId;

        //rule for CUSTOMER REMINDER
        const custPutRuleParams = {
            Name: custRuleName,
            ScheduleExpression: cronExpression,
            State: 'ENABLED'
        };

        const custRuleResponse = await eventbridge.putRule(custPutRuleParams).promise();

        //second lambda for customer reminder
        const custLambdaPermissionParams = {
            FunctionName: 'secondSchedule',
            StatementId: event.requestContext.requestId,
            Action: 'lambda:InvokeFunction',
            Principal: 'events.amazonaws.com',
            SourceArn: custRuleResponse.RuleArn
        };

        await lambda.addPermission(custLambdaPermissionParams).promise();

        const custPutTargetsParams = {
            Rule: custRuleName,
            Targets: [{
                Id: '1',
                Arn: 'arn:aws:lambda:us-east-1:836136505875:function:secondSchedule',
                Input: JSON.stringify({ email: email }),
            }]
        };

        await eventbridge.putTargets(custPutTargetsParams).promise();

        if (isMenu !== null) {
            const restRuleName = 'RestMenuReminder_' + event.requestContext.requestId;

            //rule for RESTAURANT REMINDER
            const restPutRuleParams = {
                Name: restRuleName,
                ScheduleExpression: cronExpression,
                State: 'ENABLED'
            };

            const restRuleResponse = await eventbridge.putRule(restPutRuleParams).promise();

            //second Lambda RESTAURANT REMINDER
            const restLambdaPermissionParams = {
                FunctionName: 'sendRestMenuReminder',
                StatementId: event.requestContext.requestId,
                Action: 'lambda:InvokeFunction',
                Principal: 'events.amazonaws.com',
                SourceArn: restRuleResponse.RuleArn
            };

            await lambda.addPermission(restLambdaPermissionParams).promise();

            const restPutTargetsParams = {
                Rule: restRuleName,
                Targets: [{
                    Id: '1',
                    Arn: 'arn:aws:lambda:us-east-1:836136505875:function:sendRestMenuReminder',
                    Input: JSON.stringify({ email: restEmail }),
                }]
            };

            await eventbridge.putTargets(restPutTargetsParams).promise();
        }

        return {
            statusCode: 200,
            body: JSON.stringify('Reminders created successfully!')
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify('Failed to create reminder')
        };
    }
};