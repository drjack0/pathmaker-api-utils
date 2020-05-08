import * as dynamoLib from "./libs/dynamodb-lib";
import * as uuid from "uuid";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableNameBudget,

        Item: {
            cashId: uuid.v1(),
            nomeOp: data.nomeOp,
            typeOp: data.typeOp,
            amount: data.amount,
            updatedAt: Date.now()
        }
    };

    try{
        await dynamoLib.call("put",params);
        return success(params.Item);
    } catch(err) {
        return failure({ status: false });
    }
}