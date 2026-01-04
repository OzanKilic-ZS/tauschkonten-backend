import { deleteItem } from "./dynamodb.js"; 

export const handler = async (event) => {
  console.log("event", event);
  const id = event.pathParameters.id;
  const transactionid = event.pathParameters.transactionid
  if (!id || !transactionid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing parameter" }),
    };
  }
  const result = await deleteItem(id, transactionid);   
  if (!result) {
    const response = {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,OPTIONS", "Content-Type": "application/json" },
      body: "Fehler beim Löschen der Buchung",
      };
    return response;
  }
  const response = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,OPTIONS", "Content-Type": "application/json" },
    body: "Erfolgreich gelöscht!...",
  };

  return response;
};
