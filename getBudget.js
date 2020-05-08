import * as dynamoLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    console.log(event);
    const params = {
        TableName: process.env.tableNameBudget,

        Key: {
            cashId: event.pathParameters.id
        }
    };
    console.log(params);
    try{
        const result = await dynamoLib.call("get", params);
        if(result.Item){
            return success(result.Item);
        } else {
            return failure({status: false, error: "Item not found"});
        }
    } catch(err) {
        console.log(err);
        return failure({ status: false });
    }
}