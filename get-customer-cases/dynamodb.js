const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Customer2CaseAndType";

async function getAllSortedByOrderId() {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":pk": "CustomerCase",
      ":sk": "case#",
    },
  });

  const result = await ddbDocClient.send(command);
  const items = result.Items ?? [];

  // Sortieren nach orderId (aufsteigend)
  items.sort((a, b) => {
    const aId = a.order || 0; // 0 für undefined
    const bId = b.order || 0;
    return aId - bId; // aufsteigend
  });

  return items;
}

module.exports = { getAllSortedByOrderId };
