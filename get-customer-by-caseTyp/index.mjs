import { getCustomerByCaseType } from "./dynamodb.js"; 

export const handler = async (event) => {
  console.log("event", event);
  const id = event.pathParameters.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing id parameter" }),
    };
  }
  const customerByCaseType = await getCustomerByCaseType(id);
  const response = {
    statusCode: 200,
    body: JSON.stringify(customerByCaseType),
  };

  console.log("response", response);  
  return response;
};
