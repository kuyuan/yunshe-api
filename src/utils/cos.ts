import { File, ResourceTypes, UploadResponse } from "@utils/interfaces";
import COS from "cos-nodejs-sdk-v5";
import sanitize from "sanitize-filename";
import uuidv4 from "uuid/v4";

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY,
});

const bucket = process.env.COS_BUCKET;
const region = process.env.COS_REGION || "ap-shanghai";

export const uploadImage = async (
  file: File,
  entity: ResourceTypes,
  id: string,
): Promise<UploadResponse> => {
  const { filename, stream } = await file;
  const sanitized = sanitize(filename);
  const encoded = encodeURIComponent(sanitized);
  const key = `${entity.toLocaleLowerCase()}/${id}/${uuidv4()}-${encoded}`;

  return new Promise((resolve) => {
    cos.putObject({
      Bucket: bucket,
      Region: region,
      Key: key,
      Body: stream,
    }, (err, data) => {
      if (err) {
        throw err;
      } else {
        resolve(data);
      }
    });
  });
};
