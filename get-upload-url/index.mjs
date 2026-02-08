import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "eu-central-1" });
const BUCKET_NAME = "tauschkonten";

export const handler = async (event) => {
    console.log(event);
    const { transactionId, fileName, fileType } = event.queryStringParameters;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${transactionId}/${fileName}`,
        ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
        expiresIn: 60,
    });

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,OPTIONS", "Content-Type": "application/json" },
      body: JSON.stringify({ uploadUrl }),
    };
};