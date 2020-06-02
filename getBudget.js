import * as dynamoLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: process.env.tableNameBudget,
        Key: {
            cashId: event.pathParameters.id === "" ? "null" : event.pathParameters.id
        }
    };
    try{
        const result = await dynamoLib.call("get", params);
        if(result.Item){
            return success(result.Item);
        } else {
            return failure({message: "Item not found"});
        }
    } catch(err) {
        console.log(err);
        return failure({ message: "Troubles getting element" });
    }
}