import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "eu-central-1" });
const BUCKET = "tauschkonten";

export const handler = async (event) => {
    const transactionId = event.queryStringParameters?.transactionId;
    if (!transactionId) {
        return {
        statusCode: 400,
        body: JSON.stringify({ message: "transactionId fehlt" }),
        };
    }

    const command = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: `tauschkonten/${transactionId}/`,
    });

    const result = await s3.send(command);

    const documents = (result.Contents || []).map((obj) => ({
        key: obj.Key,
        name: obj.Key.split("/").pop(),
        size: obj.Size,
        lastModified: obj.LastModified,
    }));

    return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,OPTIONS", "Content-Type": "application/json" },
        body: JSON.stringify(documents),
    };
};