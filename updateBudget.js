import * as dynamoLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableNameBudget,

        Key: {
            cashId: event.pathParameters.id,
        },

        UpdateExpression: "SET nomeOp = :nomeOp, typeOp = :typeOp, amount = :amount, updatedAt = :updateDate",
        ExpressionAttributeValues: {
            ":nomeOp": data.nomeOp || null,
            ":typeOp": data.typeOp || null,
            ":amount": data.amount || null,
            ":updateDate": Date.now()
        },

        ReturnValues: "ALL_NEW"
    };

    try{
        await dynamoLib.call("update",params);
        return success({status: true});
    } catch(err) {
        console.log(err);
        return failure({ status: false });
    }
}