import { IFile, ResourceTypes } from "@utils/interfaces";

export const uploadImage = async (
  file: IFile,
  entity: ResourceTypes,
  id: string,
) => {
  return new Promise((resolve) => {
    resolve(
      {
        "ETag": "\"b3fcc759598fb9c9cd8e806e3a6cfe1b\"",
        "Location": "dev.myqcloud.com/resource/1/image.jpg",
        "headers": {
          "connection": "close",
          "content-length": "0",
          "date": "Thu, 07 Mar 2019 12:07:25 GMT",
          "etag": "\"b3fcc759598fb9c9cd8e806e3a6cfe1b\"",
          "server": "tencent-cos",
          "x-cos-request-id": "NWM4MTA5N2NfMmM5ZDA4MDlfMTMzMF123456=",
        },
        "statusCode": 200
      }
    );
  });
};
