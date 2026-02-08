import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "eu-central-1" });
const BUCKET = "tauschkonten";

export const handler = async (event) => {

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: "",
    };
  }

  const key = event.queryStringParameters?.key;

  if (!key) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ message: "key fehlt" }),
    };
  }

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,

      ResponseContentDisposition: "inline",
    });

    const url = await getSignedUrl(s3, command, {
      expiresIn: 300, // 5 Minuten
    });

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({ url }),
    };
  } catch (err) {
    console.error("Öffnen fehlgeschlagen:", err);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ message: "Fehler beim Öffnen" }),
    };
  }
};

const corsHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Content-Type": "application/json",
});
