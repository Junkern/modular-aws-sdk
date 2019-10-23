# modular-aws-sdk

A tool to build a smaller aws-sdk with only the things you need for your application.

Currently it is only possible to build a package with one AWS lib (e.g. only `EC2`)

The original code of the `aws-sdk` is not altered in any way.

## Benefits

You have a smaller packages which saves time and costs.

Example (version `2.460.0`):

Full aws-sdk: `40 MB`
Package created with `bash create.sh dynamodb`: `3,6 MB`

## Execution

### For building a version with only one AWS service

Simply call `bash create.sh SOFTWARE` where `SOFTWARE` is a property from https://github.com/aws/aws-sdk-js/blob/master/apis/metadata.json


### Building the full SDK containg only the files needed for Node.js

```sh
npm install
bash scripts/createPureNodeJsAWSSDK.sh
# the final sdk will be in the "modular-aws-sdk-pure-node" folder
```


## Examples

* [S3](https://www.npmjs.com/package/modular-aws-sdk-s3)
* [DynamoDB](https://www.npmjs.com/package/modular-aws-sdk-dynamodb)
* [EC2](https://www.npmjs.com/package/modular-aws-sdk-ec2)
* [Route53](https://www.npmjs.com/package/modular-aws-sdk-route53)