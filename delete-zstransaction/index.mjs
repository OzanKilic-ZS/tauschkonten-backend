import { deleteItem } from "./dynamodb.js"; 

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Content-Type": "application/json"
};

export const handler = async (event) => {
  console.log("event", event);

  const id = event.pathParameters?.id;
  const transactionid = event.pathParameters?.transactionid;

  if (!id || !transactionid) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Missing parameter" }),
    };
  }

  const result = await deleteItem(id, transactionid);

  if (!result) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Fehler beim Löschen der Buchung" }),
    };
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ message: "Erfolgreich gelöscht!" }),
  };
};
