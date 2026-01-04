const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Customer2CaseAndType";

async function getCustomerByCaseType(id) {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":pk": `case#${id}`,
      ":sk": "customer#",
    },
  });
  const result = await ddbDocClient.send(command);
  const items = result.Items ?? [];
  return items;
}

module.exports = { getCustomerByCaseType };
