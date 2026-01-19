import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });
const TABLE_NAME = "Customer2CaseAndType";
const INDEX_NAME = "customer2CaseAndTypeId";

export const handler = async (event) => {
  const customer2CaseAndTypeId = event?.pathParameters?.id;

  if (!customer2CaseAndTypeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing customer2CaseAndTypeId" }),
    };
  }

  const command = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: INDEX_NAME,
    KeyConditionExpression: "customer2CaseAndTypeId = :id",
    ExpressionAttributeValues: {
      ":id": customer2CaseAndTypeId,
    },
    Limit: 1,
  });

  const result = await client.send(command);

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,OPTIONS", "Content-Type": "application/json" },
    body: JSON.stringify(result.Items?.[0] ?? null),
  };
};
