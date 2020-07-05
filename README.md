# PathMaker Backend - Budgeting & Utils Services

A [Serverless Framework](https://www.serverless.com/) based project with ES7 syntax, serverless-offline, linting, environment variables, unit test support.

To implement this, the **following plugins** were needed:
- [Serverless-bundle](https://github.com/AnomalyInnovations/serverless-bundle) plugin
- [Serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) plugin, to generate optimized Lambda packages with Webpack. No need to manage WebPack or Babel configs
- [Serverless-offline](https://github.com/dherault/serverless-offline) plugin, to run API Gateway locally. Use `serverless offline start`
- [Serverless-aws-documentation](https://github.com/deliveryhero/serverless-aws-documentation) plugin, to generate API Gateway Documentation based on [OAS2](https://swagger.io/specification/v2/)

And, for development, the **following resources** were employed
- `AWS DynamoDB` *(NoSQL Tables, storing information)*
- `AWS Lambda` *(Calc and integration with DynamoDB table)*
- `AWS API Gateway` *(API distribution)*
- `AWS S3` *(both webhosting and file storage)*
- `AWS CloudFront` *(CDN distribution)*
- `AWS Route 53` *(Domain register and DNS Routing)*
- `AWS ACM` *(SSL Certificate Manager)*
- `AWS Cognito Identity Pool` *(User information storage)*
- `AWS Cognito Federated Identity` *(User Permissions and clint-side authorization)*

Users, through [Frontend Side](https://github.com/drjack0/pathmaker-client) on [pathmaker.it](https://pathmaker.it), make API calls.

API Gateway takes care of managing these calls and each has a lambda function associated with it.
Lambdas take care of interacting with the dynamodb tables (or, in particular cases, with other AWS services), carrying out the required operations.

Cause of AWS Limits and in order to obtain a `better and more scalable result`, the structure was divided into `microservices`

---

### Requirements & Resources

- [Serverless Framework](https://www.serverless.com/)
- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

Enter the new directory

``` bash
$ cd my-project
```

Install the Node.js packages

``` bash
$ npm install
```

### Some Informations...

This Repository refers to "Budget" and "Utils" Microservices

These documented functions have been coded to manage basic CRUD Operations regarding some AWS-DynamoDB tables and Cognito User Pool: in detail, they allow the user, through specific API calls, to interface with "Budget" DynamoDB Table remotely and handle Users informations and administration.

The calls are encrypted with sigv4 method, therefore they need some specific AWS keys (ACCESS-KEY & SECRET-KEY) for the use, with the latter used to encode the REST calls to the server.

These credentials are obtainable by the user, on the client side, through the **[Amplify](https://docs.amplify.aws/)** library, which interfaces directly with Cognito, creating a specific role, with specific permissions, in such a way as to allow operations

Behind each API call, we find a specific Lambda function that deals with logic and computational calc. Although these Lambda functions cannot be invoked directly during use, **[it is possible to do so during development](#usage)**

More on sigv4 can be found here https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

Request and response templates can be found in the **[API Documentation](https://api.pathmaker.it)**

---

### Usage

To run a function on your local

``` bash
$ serverless invoke local --function ExampleFunctionHello
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

Deploy your project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function hello
```

#### Running Tests

This feature is not currently enabled, as AWS secondary login credentials are missing

``` bash
$ npm test
```

Jest is used to run our tests

#### [API Documentation](https://api.pathmaker.it) can be found here