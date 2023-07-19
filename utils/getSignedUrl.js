import s3 from "./s3Config.js";
import dotenv from "dotenv";
dotenv.config();

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export const getUrlByID = async (exerciseID) => {
  const key = exerciseID + ".gif";
  const getObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};
