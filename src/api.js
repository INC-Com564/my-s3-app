import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Create an S3 client
export const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    }
});

// CloudFront URL generator
export const getCloudFrontUrl = (key) => {
    return `https://${import.meta.env.VITE_CLOUDFRONT_DOMAIN}/${key}`;
};

// Regular API client
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000, // Increased timeout
    headers: {
        'Content-Type': 'application/json'
    },
});

// Upload file to S3
export const uploadToS3 = async (file, key) => {
    const command = new PutObjectCommand({
        Bucket: import.meta.env.VITE_S3_BUCKET,
        Key: key,
        Body: file,
        ContentType: file.type,
    });

    await s3Client.send(command);
    return getCloudFrontUrl(key);
};