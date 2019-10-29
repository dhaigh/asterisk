'use strict';

const AWS = require('aws-sdk');
const Dynamo = require('./dynamo');

AWS.config.update({ region: "ap-southeast-2" });
AWS.config.apiVersions = {
    dynamodb: '2012-08-10',
};

module.exports.getState = async (event) => {
    const { id } = event.pathParameters;

    try {
        const item = await Dynamo.getItem("Games", id);
        const { playerName, color } = item;
        return {
            statusCode: 200,
            body: JSON.stringify({
                color, playerName
            }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: error.message,
            }),
        };
    }

};

module.exports.putState = async (event, context) => {
    const ddb = new AWS.DynamoDB();
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-2" });
    const { id, playerName, color } = JSON.parse(event.body);

    const params = {
        TableName: "Games",
        Item: { id, playerName, color }
    };

    try {
        const data = await documentClient.put(params).promise();
        return {
             statusCode: 201,
             body: JSON.stringify(data),
        };

    } catch (error) {
        console.log(error)
    }
};

