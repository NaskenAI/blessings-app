import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: process.env.S3_REGION!,
  accessKeyId: process.env.S3_ACCESS_KEY_ID!,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  signatureVersion: "v4",
});

export async function POST(req: Request) {
  const { fileName, fileType } = await req.json();

  const params = {
    Bucket: process.env.S3_BUCKET!,
    Key: `uploads/${Date.now()}-${fileName}`,
    Expires: 60,
    ContentType: fileType,
  };

  const uploadUrl = await s3.getSignedUrlPromise("putObject", params);

  return NextResponse.json({ uploadUrl, key: params.Key });
}

