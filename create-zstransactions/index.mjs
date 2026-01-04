import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "eu-central-1", 
  credentials: { accessKeyId: "AKIA2UK6GZDT6GMBXRND", secretAccessKey: "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"} });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "ZSTransaction";

export const handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const id = event.pathParameters.id;
  console.log("item.transactionId = " + item.transactionId);

  const transactionId = event.pathParameters.transactionid ?? crypto.randomUUID();
  try {
      const item = {
        transactionId: transactionId,
        customer2CaseAndTypeId: id,
        custName: body.custName || "",
        custCaseTypeBeschreibung: body.custCaseTypeBeschreibung || "",
        lieferAbholdatum: body.lieferAbholdatum || "",
        lieferscheinNr: body.lieferscheinNr || "",
        abholscheinNr: body.abholscheinNr || "",
        auftragsNrZs: body.auftragsNrZs || "",
        auftragsNrKunde: body.auftragsNrKunde || "",
        rechnungsNrZS: body.rechnungsNrZS || "",
        buchungsinfo: body.buchungsinfo || "",
        lieferungZS: body.lieferungZS || 0,
        abholungZS: body.abholungZS || 0,
        saldo: body.saldo || 0,
        creationDate: new Date().toISOString(),
        createdBy: body.createdBy,  
        bemerkung: body.bemerkung || "",
      };
  
      console.log("item.transactionId = " + item.transactionId);
      await ddbDocClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: item
        })
      );
    
    return {
        statusCode: 201,
        headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Transaction erfolgreich erstellt",
          item
        })
      };
  
    } catch (error) {
      console.error("DynamoDB Fehler:", error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Fehler beim Erstellen der Transaction",
          error: error.message
        })
      };
    }
};
