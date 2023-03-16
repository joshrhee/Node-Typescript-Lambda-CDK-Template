#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SmartGlassDepthEstimationCdkStack } from '../lib/smart-glass-depth-estimation-cdk-stack';

const app = new cdk.App();
new SmartGlassDepthEstimationCdkStack(app, 'SmartGlassDepthEstimationCdkStack');
