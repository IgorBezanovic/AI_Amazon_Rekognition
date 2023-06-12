import { s3 } from './getAwsConfig';

//Get all images from s3
export const getAllImagesFromS3 = async (bucketName: string) => {
  let objects: AWS.S3.Object[] = [];
  let isTruncated = true;
  let continuationToken;

  while (isTruncated) {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: bucketName,
      ContinuationToken: continuationToken,
    };
    const result = await s3.listObjectsV2(params).promise();
    objects.push(...(result.Contents || []));
    isTruncated = result.IsTruncated || false;
    continuationToken = result.NextContinuationToken;
  }

  const updatedObjects = await Promise.all(
    objects.map(async (obj) => {
      const url = `https://${bucketName}.s3.amazonaws.com/${encodeURIComponent(
        obj.Key || ""
      )}`;
      const updatedObj = { ...obj, URL: url };
      return updatedObj;
    })
  );

  return updatedObjects;
}
