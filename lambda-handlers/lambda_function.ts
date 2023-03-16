import {
    APIGatewayProxyHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from "aws-lambda";
import * as AWS from "aws-sdk";

const s3 = new AWS.S3();
const sagemakerRuntime = new AWS.SageMaker();

export const getDepthEstimation: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    // // Decode the base64 image from the event body
    // const base64Image = event.body as string;
    // const contentType = event.headers["Content-Type"] || "image/jpeg";
    // const bucketName = "smartGlass-imageBucket";
    // const fileName = "inputImage";

    // // Convert the base64 image to a buffer
    // const buffer = Buffer.from(base64Image, "base64");

    // // Save the image to S3
    // const s3Params: AWS.S3.PutObjectRequest = {
    //     Bucket: bucketName,
    //     Key: fileName,
    //     Body: buffer,
    //     ContentType: contentType,
    //     ContentEncoding: "base64",
    // };

    try {
        // await s3.putObject(s3Params).promise();

        const bodyMessage = event.body as string;

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: `Image is saved in S3!!!!, message: ${bodyMessage}`,
            }),
        };
        return response;

        // Image saved to S3, now call Sagemaker endpoint
    } catch (err) {
        const error = err as Error;

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.message,
            }),
        };
    }
};
