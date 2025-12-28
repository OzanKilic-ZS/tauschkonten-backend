import { getZSTransactions } from "./dynamodb.js"; 

export const handler = async (event) => {
  console.log("event", event);
  const id = event.pathParameters.id;
  const fromDate = event.queryStringParameters?.fromDate;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing id parameter" }),
    };
  }
  const zstransaction = await getZSTransactions(id, fromDate);   
  const response = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,OPTIONS", "Content-Type": "application/json" },
    body: JSON.stringify(zstransaction),
  };

  return response;
};
