import { getAllSortedByOrderId } from "./dynamodb.js"; 

export const handler = async (event) => {
  const customerCase = await getAllSortedByOrderId();
  const response = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,OPTIONS", "Content-Type": "application/json" },
    body: JSON.stringify(customerCase),
  };
  return response;
};
