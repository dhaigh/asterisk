const region = "ap-southeast-2";

const AWS = require("aws-sdk");
AWS.config.update({ region });
AWS.config.apiVersions = { dynamodb: "2012-08-10" };

const client = new AWS.DynamoDB.DocumentClient({ region });

module.exports = class Dynamo {
    static async getItem(table, id) {
        const data = await client.get({
            TableName: table,
            Key: { id },
        }).promise();

        if (!data.Item) {
            throw new Error("No Item with that ID");
        }

        return data.Item;
    }
}
