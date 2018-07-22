console.log('Loading function');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'X-hello-world': 'kk',
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            done(new Error(`Unsupported method "${event.httpMethod}"`));
            break;
        case 'GET':
            var res = {
                "ip_address": event.requestContext.identity.sourceIp,
            }
            var name = event.queryStringParameters.name;
            if (name != undefined && name != "") {
                res['greeting'] = "Hey there, " + name + "! You're looking great today! :)";
            }
            done("", res);
            break;
        case 'POST':
            done(new Error(`Unsupported method "${event.httpMethod}"`));
            break;
        case 'PUT':
            done(new Error(`Unsupported method "${event.httpMethod}"`));
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
