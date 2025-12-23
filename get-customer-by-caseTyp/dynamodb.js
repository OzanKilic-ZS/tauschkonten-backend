const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1", 
  credentials: { accessKeyId: "AKIA2UK6GZDT6GMBXRND", secretAccessKey: "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"} });
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
