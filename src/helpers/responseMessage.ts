import { APIGatewayProxyResult } from 'aws-lambda';

export const responseMessage = async (code: number, body: any): Promise<APIGatewayProxyResult> => {
  const statusCode = code;
  const headers = { 
    "Access-Control-Allow-Headers" : "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  let responseBody: string;

  if (typeof body === 'string') {
    responseBody = body;
  } else {
    responseBody = JSON.stringify(body);
  }

  const response: APIGatewayProxyResult = {
    statusCode,
    body: responseBody,
    headers,
  };

  return response;
};