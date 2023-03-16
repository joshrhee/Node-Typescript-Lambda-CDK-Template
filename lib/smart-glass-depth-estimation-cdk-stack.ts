import { aws_iam, Stack, StackProps } from "aws-cdk-lib";
import { createS3Bucket } from "./s3";
import { createLambda } from "./lambda";
import { createApiGateway } from "./apiGateway";
// import * as sns from "aws-cdk-lib/aws-sns";
// import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
// import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

export class SmartGlassDepthEstimationCdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // create the S3 bucket
        const imageBucket = createS3Bucket(this, "smartglass-imagebucket");

        // create the lambda function
        const depthEstimationLambda = createLambda(
            this,
            "smartglass-depthEstimation-get",
            "lambda-handlers",
            "lambda_function.ts",
            "getDepthEstimation",
            3008,
            30,
            imageBucket.bucketName
        );

        // Grant the Lambda function permissions to access the S3 bucket and SageMaker
        imageBucket.grantReadWrite(depthEstimationLambda);
        depthEstimationLambda.addToRolePolicy(
            new aws_iam.PolicyStatement({
                effect: aws_iam.Effect.ALLOW,
                actions: ["sagemaker:InvokeEndpoint"],
                resources: [
                    "arn:aws:sagemaker:*:*:endpoint/smartglass-depthEstimationModel",
                ],
            })
        );

        // Create API Gateway
        const lambdaFunctions = [
            {
                lambdFunction: depthEstimationLambda,
                httpMethod: "POST",
                path: "depthEstimation",
            },
        ];
        createApiGateway(this, "smartglass-ApiGateway", lambdaFunctions);

        // const queue = new sqs.Queue(this, "SmartGlassDepthEstimationCdkQueue", {
        //     visibilityTimeout: Duration.seconds(300),
        // });

        // const topic = new sns.Topic(this, "SmartGlassDepthEstimationCdkTopic");

        // topic.addSubscription(new subs.SqsSubscription(queue));
    }
}
