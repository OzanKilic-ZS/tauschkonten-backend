import { getCustomerCases } from "./dynamodb.js"; 

export const handler = async (event) => {
  const customerCase = await getCustomerCases();
  const response = {
    statusCode: 200,
    body: customerCase,
  };
  return response;
};
