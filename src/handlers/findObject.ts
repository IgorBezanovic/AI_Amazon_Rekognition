import { s3, rekognition } from '../helpers/getAwsConfig';
import { APIGatewayProxyResult } from 'aws-lambda';
import { responseMessage } from '../helpers/responseMessage';

export const handler = async (): Promise<APIGatewayProxyResult>  => {
  try {
    const bucketName = 'testing-logos';
    //Get all images from s3
    async function getAllObjectsFromBucket(bucketName: string) {
      let objects: AWS.S3.Object[] = [];
      let isTruncated = true;
      let continuationToken;
    
      while (isTruncated) {
        const params: AWS.S3.ListObjectsV2Request = {
          Bucket: bucketName,
          ContinuationToken: continuationToken,
        };
        const result = await s3.listObjectsV2(params).promise();
        objects = objects.concat(result.Contents || []);
        isTruncated = result.IsTruncated || false;
        continuationToken = result.NextContinuationToken;
      }
    
      return objects;
    }

    const response = await getAllObjectsFromBucket('testing-logos')
    console.log(await getAllObjectsFromBucket('testing-logos'))
    
    // Data of custom labels project
    const projectId = "find-logo"; // Replace with the ID of your custom label project
    const labelId = "logo"; // Replace with the ID of the custom label you want to use

    for (const image of response) {
      console.log('image: ', image)
      const params = {
        Image: { 
          S3Object: {
            Bucket: bucketName,
            Name: image.Key
          }
        },
        // MaxLabels: 10,
        // MinConfidence: 70,
        // ProjectVersionArn: `arn:aws:rekognition:eu-west-1:765891906457:project/${projectId}/version/latest/`,
        // CustomLabels: [labelId],
      };
    
      try {
        // Detect labels
        // const resultLabels = await rekognition.detectLabels(params).promise();

        // Detect custom labels
        // const resultLabels = await rekognition.detectCustomLabels(params).promise();

        // Detect text
        const resultLabels = await rekognition.detectText(params).promise();
        console.log(`Labels detected for ${image.Key}:`, resultLabels);
        // console.log(`Labels detected for ${image.Key}:`, resultLabels);
      } catch (err) {
        console.log(`Error detecting labels for ${image.Key}:`, err);
      }
    }

    return responseMessage(200, response);
  } catch (error) {
    return responseMessage(200, error);
  }
};
