import * as dynamoLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: process.env.tableNameBudget,

        Key: {
            cashId: event.pathParameters.id
        }
    };
    try{
        const result = await dynamoLib.call("delete", params);
        if(result){
            return success(result.Item);
        } else {
            return failure({message: "Item not found"});
        }
    } catch(err) {
        return failure({ message: "Troubles Deleting Item" });
    }
}