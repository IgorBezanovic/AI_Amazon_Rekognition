import AWS from 'aws-sdk';

// get variables from sls-env
const { REGION } = process.env;

// create Rekognition function
export const rekognition = new AWS.Rekognition();

// create S3 function
export const s3 = new AWS.S3();