const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, QueryCommand, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ 
    region: "eu-central-1",
    credentials: { accessKeyId: "AKIA2UK6GZDT6GMBXRND", secretAccessKey: "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"} 
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Kunden"; // Name deiner DynamoDB-Tabelle

async function getCustomerCases() {
  const command = new ScanCommand({ TableName: "CustomerCase" });
  const result = await ddbDocClient.send(command);
  return result.Items || [];
}

module.exports = { getCustomerCases };