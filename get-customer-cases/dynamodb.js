const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1", 
  credentials: { accessKeyId: "AKIA2UK6GZDT6GMBXRND", secretAccessKey: "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"} });
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
