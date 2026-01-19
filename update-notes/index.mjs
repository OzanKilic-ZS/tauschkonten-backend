import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Customer2CaseAndType";

export const handler = async (event) => {
    const body = JSON.parse(event.body || "{}");
    const pk = body.pk;
    const sk = body.sk;

    await ddbDocClient.send(
        new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { pk, sk },
            UpdateExpression: "SET #note = :note, #changedBy = :changedBy, #lastChanged = :lastChanged",
            ExpressionAttributeNames: {
                "#note": "note",
                "#changedBy": "noteChangedBy",
                "#lastChanged": "noteLastChanged"
            },
            ExpressionAttributeValues: {
                ":note": body.note,
                ":changedBy": body.noteChangedBy,
                ":lastChanged": body.noteLastChanged
            },
            ReturnValues: "NONE"
    }));

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "PUT,OPTIONS", "Content-Type": "application/json" },
      body: JSON.stringify({ message: "notes added successfully!" }),
    };
};
