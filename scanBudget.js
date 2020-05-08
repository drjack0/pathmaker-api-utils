import AWS from "aws-sdk";
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
    console.log(event);
    const params = {
        TableName: process.env.tableNameBudget
    };
    console.log(params);
    var items = [];

    var scanExecute = function(callback){
        dynamoDb.scan(params,function(err,result){
            const headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            };
            if(err){
                const response = {
                    statusCode: 500,
                    headers: headers,
                    body: JSON.stringify({status: false})
                };
                callback(null,response);
                return;
            } else {
                items = items.concat(result.Items);
                if(result.LastEvaluatedKey){
                    params.ExclusiveStartKey = result.LastEvaluatedKey;
                    scanExecute(callback);
                } else {
                    const response = {
                        statusCode: 200,
                        headers: headers,
                        body: JSON.stringify(items)
                    };
                    callback(null,response);
                }
            }
        });
    };
    scanExecute(callback);
}