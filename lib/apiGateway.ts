// import { Stack, StackProps } from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface LambdFunctions {
    lambdFunction: lambda.Function;
    httpMethod: string;
    path: string;
}

export function createApiGateway(
    scope: Construct,
    apiGatewayName: string,
    lambdFunctions: LambdFunctions[]
) {
    const api = new apigateway.RestApi(scope, apiGatewayName, {
        restApiName: apiGatewayName,
    });

    lambdFunctions.map((lambdaFunctionInformation, _) => {
        const lambdaFunction = lambdaFunctionInformation.lambdFunction;
        const httpMethod = lambdaFunctionInformation.httpMethod;
        const apiPath = lambdaFunctionInformation.path;

        const apiGatewayResource = api.root.addResource(apiPath);

        const lambdIntegration = new apigateway.LambdaIntegration(
            lambdaFunction
        );
        apiGatewayResource.addMethod(httpMethod, lambdIntegration);
    });

    return api;
}
