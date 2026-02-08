import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "eu-central-1" });
const BUCKET = "tauschkonten";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export const handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event));

  // ✅ CORS PRE-FLIGHT
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  //  ab hier erst DELETE
  const transactionId = event.queryStringParameters?.transactionId;
  const key = event.queryStringParameters?.key;

  if (!transactionId || !key) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: "transactionId oder key fehlt" }),
    };
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });

    await s3.send(command);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Dokument gelöscht" }),
    };
  } catch (err) {
    console.error("Löschen fehlgeschlagen:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Fehler beim Löschen", error: err.message }),
    };
  }
};
