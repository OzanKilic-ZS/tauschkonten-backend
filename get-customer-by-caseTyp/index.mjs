import { getCustomerByCaseType } from "./dynamodb.js"; 

export const handler = async (event) => {
  const id = event?.pathParameters?.id;
  console.log("event", event);

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing id parameter" }),
    };
  }
  const customerByCaseType = await getCustomerByCaseType(id);
  const response = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,OPTIONS", "Content-Type": "application/json" },
    body: JSON.stringify(customerByCaseType),
  };

  return response;
};
