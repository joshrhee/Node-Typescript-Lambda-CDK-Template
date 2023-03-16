import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export function createS3Bucket(scope: Construct, bucketName: string) {
    const imageBucket = new s3.Bucket(scope, bucketName, {
        bucketName: bucketName,
    });

    return imageBucket;
}
