import { rekognition } from '../helpers/getAwsConfig';
import { APIGatewayProxyResult } from 'aws-lambda';
import { responseMessage } from '../helpers/responseMessage';
import { getAllImagesFromS3 } from '../helpers/getAllImagesFromS3';

export const handler = async (): Promise<APIGatewayProxyResult>  => {
  try {
    const bucketName = 'testing-logos';
    const response = await getAllImagesFromS3(bucketName)
    console.log(await getAllImagesFromS3(bucketName))

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
        // ProjectVersionArn: 'arn:aws:rekognition:eu-west-1:765891906457:project/find-logo/version/find-logo.2023-05-23T22.11.30/1684872690097',
      };
    
      try {
        // Detect labels
        // const resultLabels = await rekognition.detectLabels(params).promise();

        // Detect custom labels
        // const resultLabels = await rekognition.detectCustomLabels(params).promise();

        // Detect text
        const resultLabels = await rekognition.detectText(params).promise();

        console.log(`Labels detected for ${image.Key}:`, resultLabels);
      } catch (err) {
        console.log(`Error detecting labels for ${image.Key}:`, err);
      }
    }

    return responseMessage(200, response);
  } catch (error) {
    return responseMessage(200, error);
  }
};
