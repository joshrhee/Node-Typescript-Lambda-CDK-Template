import { Capture, Match, Template } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";
import * as SmartGlassDepthEstimationCdk from "../lib/smart-glass-depth-estimation-cdk-stack";
import { getDepthEstimation } from "../lambda-handlers/lambda_function";

describe("StateMachineStack", () => {
    test("lambda_function, getDepthEstimation test!!", () => {
        const app = new cdk.App();

        // Since the StateMachineStack consumes resources from a separate stack
        // (cross-stack references), we create a stack for our SNS topics to live
        // in here. These topics can then be passed to the StateMachineStack later,
        // creating a cross-stack reference.
        // const topicsStack = new cdk.Stack(app, "TopicsStack");

        // Create the topic the stack we're testing will reference.
        // const topics = [new sns.Topic(topicsStack, "Topic1", {})];

        // Create the StateMachineStack.
        const stateMachineStack =
            new SmartGlassDepthEstimationCdk.SmartGlassDepthEstimationCdkStack(
                app,
                "StateMachineStack"
                // {
                //     //   topics: topics, // Cross-stack reference
                // }
            );

        // Prepare the stack for assertions.
        const template = Template.fromStack(stateMachineStack);

        // Assert it creates the function with the correct properties...
        template.hasResourceProperties("AWS::Lambda::Function", {
            Handler: "index.getDepthEstimation",
            Runtime: "nodejs14.x",
        });

        const event = {
            data: "hello world",
        };

        // // Creates the subscription...
        // template.resourceCountIs("AWS::SNS::Subscription", 1);
    });
});
