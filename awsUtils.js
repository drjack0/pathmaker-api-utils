import AWS from "aws-sdk";
import csv from "csvtojson";
import { success, failure } from "./libs/response-lib";
import * as dynamoLib from "./libs/dynamodb-lib";

export function disableUser(event, context,callback) {
    var cognitoISP = new AWS.CognitoIdentityServiceProvider();

    const params = {
        UserPoolId: "eu-central-1_mGorCqMeq",
        Username: event.pathParameters.user
    };

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    };

    cognitoISP.adminDisableUser(params, function(err,data){
        if(err){
            const response = {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({status: false})
            };
            console.log(err);
            callback(null,response);
        } else {
            const response = {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({status: true})
            };
            callback(null,response);
        }
    });
}

export function enableUser(event, context, callback) {
    var cognitoISP = new AWS.CognitoIdentityServiceProvider();

    const params = {
        UserPoolId: "eu-central-1_mGorCqMeq",
        Username: event.pathParameters.user
    };

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    };

    cognitoISP.adminEnableUser(params, function(err,data){
        if(err){
            const response = {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({status: false})
            };
            console.log(err);
            callback(null,response);
        } else {
            const response = {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({status: true})
            };
            callback(null,response);
        }
    });
}

export function listUsers(event, context, callback) {
    var cognitoISP = new AWS.CognitoIdentityServiceProvider();

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    };

    const params = {
        UserPoolId: "eu-central-1_mGorCqMeq",
        AttributesToGet: ['email']
    };

    cognitoISP.listUsers(params, function(err,data){
        if(err){
            const response = {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({status: false})
            };
            console.log(err);
            callback(null,response);
        } else {
            console.log(data);
            const response = {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify(data)
            };
            callback(null,response);
        }
    });
}

export function deleteUser(event, context, callback) {
    var cognitoISP = new AWS.CognitoIdentityServiceProvider();

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    };

    const params = {
        UserPoolId: "eu-central-1_mGorCqMeq",
        Username: event.pathParameters.user
    };

    cognitoISP.adminDeleteUser(params, function(err,data){
        if(err){
            const response = {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({status: false})
            };
            console.log(err);
            callback(null,response);
        } else {
            console.log(data);
            const response = {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify(data)
            };
            callback(null,response);
        }
    });
}

export async function importCSV(event, context) {
    const S3 = new AWS.S3();
    const params = {
        Bucket: 'pathmaker-burocracy',
        Key: 'public/csv/IMPORT-CSV'
    };
    const stream = S3.getObject(params).createReadStream();
    const json = await csv({
        delimiter: ";"
    }).fromStream(stream);
    var ret = [];
    for(var i = 0; i < json.length; i++){
        const dataNascita = (json[i].NASCITA !== '' || json[i].NASCITA !== null || json[i].NASCITA !== undefined) ? (json[i].NASCITA.split("/")[2] + "-" + json[i].NASCITA.split("/")[1] + "-" + json[i].NASCITA.split("/")[0] ) : "N/A";
        ret.push({
            burocrazia: {
                autorizzazione: {
                    consegnato: "N/A",
                    dataConsegna: "data consegna",
                    documento: "link"
                },
                censimento: "00",
                fogliCensimento: {
                    consegnato: "N/A",
                    dataConsegna: "data consegna",
                    documento: "link"
                  },
                privacy: {
                    consegnato: "N/A",
                    dataConsegna: "data consegna",
                    documento: "link"
                },
                schedaSanitaria: {
                    consegnato: "N/A",
                    dataConsegna: "data consegna",
                    documento: "link"
                },
                tesseraSanitaria: {
                    consegnato: "N/A",
                    dataConsegna: "data consegna",
                    documento: "link"
                },
                updateBurocrazia: Date.now()
            },
            censcode: (json[i].CODICE === '' || json[i].CODICE === null) ? Math.random()*10 : json[i].CODICE.toString(),
            cognome: json[i].COGNOME.toString(),
            mamma: {
                cellMamma: (json[i].CELLMADRE === '' || json[i].CELLMADRE === null || json[i].CELLMADRE === undefined) ? "N/A" : json[i].CELLMADRE.toString(),
                mailMamma: (json[i].MAILMADRE === '' || json[i].MAILMADRE === null || json[i].MAILMADRE === undefined) ? "N/A" : json[i].MAILMADRE.toString(),
                nomeMamma: (json[i].MADRE === '' || json[i].MADRE === null || json[i].MADRE === undefined) ? "N/A" : json[i].MADRE.toString(),
                updateMamma: Date.now()
            },
            mensili: {
                accontoEstivo: "00",
                aprile: "00",
                campoExtra: "00",
                dicembre: "00",
                febbraio: "00",
                gennaio: "00",
                maggio: "00",
                marzo: "00",
                novembre: "00",
                ottobre: "00",
                saldoEstivo: "00",
                updateMensili: Date.now()
            },
            nome: json[i].NOME,
            papa: {
                cellPapa: (json[i].CELLPADRE === '' || json[i].CELLMADRE === null || json[i].CELLPADRE === undefined) ? "N/A" : json[i].CELLPADRE.toString(),
                nomePapa: (json[i].PADRE === '' || json[i].PADRE === null || json[i].PADRE === undefined) ? "N/A" : json[i].PADRE.toString(),
                mailPapa: (json[i].MAILPADRE === '' || json[i].MAILPADRE === null || json[i].MAILPADRE === undefined) ? "N/A" : json[i].MAILPADRE.toString(),
                updatePapa: Date.now()
            },
            recapiti: {
                casa: (json[i].CASA === '' || json[i].CASA === null || json[i].CASA === undefined) ? "N/A" : json[i].CASA.toString(),
                cellulare: (json[i].CELLULARE === '' || json[i].CELLULARE === null || json[i].CELLULARE === undefined) ? "N/A" : json[i].CELLULARE.toString(),
                indirizzo: (json[i].INDIRIZZO === '' || json[i].INDIRIZZO === null || json[i].INDIRIZZO === undefined) ? "N/A" : json[i].INDIRIZZO.toString(),
                nascita: (json[i].NASCITA === '' || json[i].NASCITA === null || json[i].NASCITA === undefined) ? "N/A" : dataNascita.toString(),
                updateRecapiti: Date.now()
            },
            sentiero: {
                anno: (json[i].ANNO === '' || json[i].ANNO === null || json[i].ANNO === undefined) ? "N/A" : json[i].ANNO.toString(),
                camminaPer: (json[i].CAMMINA === '' || json[i].CAMMINA === null || json[i].CAMMINA === undefined) ? "N/A" : json[i].CAMMINA.toString(),
                competenze: [],
                incarico: (json[i].INCARICO === '' || json[i].INCARICO === null || json[i].INCARICO === undefined) ? "N/A" : json[i].INCARICO.toString(),
                lavoraPer: (json[i].LAVORA === '' || json[i].LAVORA === null || json[i].LAVORA === undefined) ? "N/A" : json[i].LAVORA.toString(),
                noteSentiero: (json[i].NOTE === '' || json[i].NOTE === null || json[i].NOTE === undefined) ? "N/A" : json[i].NOTE.toString(),
                obiettivi: [],
                squadriglia: (json[i].SQUADRIGLIA === '' || json[i].SQUADRIGLIA === null || json[i].SQUADRIGLIA === undefined) ? "N/A" : json[i].SQUADRIGLIA.toString(),
                updateSentiero: Date.now()
            },
            updatedAt: Date.now()
        });
    };
    for(var j=0; j < ret.length; j++){
        const params = {
            TableName: process.env.tableNameReparto,
            Item: ret[j]
        };
        try{
            await dynamoLib.call("put",params);
        } catch(err){
            return failure({status: false});
        };
    };
    return success({status: true});
}