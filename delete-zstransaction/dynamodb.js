const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "ZSTransaction";

async function deleteItem(pk, sk) {
  const params = {
    TableName: TABLE_NAME,
    Key: { customer2CaseAndTypeId: pk, transactionId: sk }
  };

  try {
    await ddbDocClient.send(new DeleteCommand(params));
    console.log("Item erfolgreich gelöscht");
    return true;
  } catch (err) {
    console.error("Fehler beim Löschen:", err);
    return false;
  }
}

module.exports = { deleteItem };
