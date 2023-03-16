import { Duration } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export function createLambda(
    scope: Construct,
    functionName: string,
    codePath: string,
    lambdaFunctionFile: string,
    handlerFile: string,
    memorySize: number,
    timeOut: number,
    bucketName?: string
) {
    const lambdaFunction = new NodejsFunction(scope, functionName, {
        functionName: functionName,
        entry: `${codePath}/${lambdaFunctionFile}`,
        handler: handlerFile,
        runtime: lambda.Runtime.NODEJS_14_X,
        memorySize: memorySize,
        timeout: Duration.seconds(timeOut),
        environment: {
            BUCKET: bucketName as string,
        },
    });

    return lambdaFunction;
}
