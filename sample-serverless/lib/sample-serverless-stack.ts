import { Construct } from 'constructs';
import { App, Stack } from 'aws-cdk-lib';
import { aws_dynamodb, StackProps } from 'aws-cdk-lib';
import {aws_lambda, aws_apigatewayv2} from 'aws-cdk-lib';
//Possibly need aws_api and rest_api
import { aws_s3 as s3 } from 'aws-cdk-lib';               // stable module
import * as codestar from '@aws-cdk/aws-codestar-alpha';  // experimental module


export class SampleServerlessStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
      //write infrastructure code
    
    //Dynamo Table Definition
    const table = new aws_dynamodb.Table(this, "Hello", {
      partitionKey: { name : "name", type : aws_dynamodb.AttributeType.STRING},
    });

    //lambda function
    const dynamoLambda = new aws_lambda.Function(this, "DynamoLambdaHandler", {
      runtime: aws_lambda.Runtime.NODEJS_12_X,
      code: aws_lambda.Code.fromAsset("./functions"),
      handler: "function.handler",
      environment: {
        HELLO_TABLE_NAME: table.tableName,
      },
    });
    //permissions to lambda to dynamo table
    table.grantReadWriteData(dynamoLambda);
    const api = new aws_apigatewayv2.RestApi(this,"hello-api");

    //Create branches
    const helloGroups = api.root.resourceForPath("helloGroups");
    helloGroups.addMethod("GET", new aws_apigatewayv2.LambdaIntegration(dynamoLambda));

    new CfnOutput(this, "HTTP API URL",{
      value: api.url ?? "Something went wrong with deploy",
    });
}
}
