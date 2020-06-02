import * as dynamoLib from "./libs/dynamodb-lib";
import * as uuid from "uuid";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    try{
        const data = JSON.parse(event.body);
        try{
            const params = {
                TableName: process.env.tableNameBudget,
                Item: {
                    cashId: uuid.v1(),
                    nomeOp: data.nomeOp,
                    typeOp: (data.typeOp === "+" || data.typeOp === "-") ? data.typeOp : "+",
                    amount: (parseInt(data.amount) >= 0 || parseInt(data.amount) != null || parseInt(data.amount) != undefined) ? data.amount : "0",
                    updatedAt: Date.now()
                }
            };
            try{
                await dynamoLib.call("put",params);
                return success(params.Item);
            } catch(err) {
                return failure({ message: "Error Putting Budget Entry in DynamoDB" });
            }
        } catch(e) {
            return failure({message: "Error Creating Budget Entry"});
        }
    } catch(err) {
        return failure({message: "Error Parsing: JSON Request String"});
    }
}