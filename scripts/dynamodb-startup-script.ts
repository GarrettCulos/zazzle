import AWS from "aws-sdk";
import fs  from 'fs';
import { seedFunction } from './seed-data';
const awsConfig: any = {
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
  }
AWS.config.update(awsConfig);

const tables = JSON.parse(fs.readFileSync(__dirname + '/tables.json', 'utf8'));
const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();
const tableNames = Object.keys(tables);

dynamodb.listTables((err, data) => {
    if ( err ) {
        console.log(err, err.stack)
        return;
    }
    const loadedTables = data.TableNames;
    tableNames.forEach(tableName => {
        if ( tableName ){
            const params = tables[tableName];
            const createTable = () => { 
                dynamodb.createTable(params, (err, data) => {
                    if (err) {
                        console.error('Unable to create table. Error JSON:', JSON.stringify(err, undefined, 2));
                    } else {
                        console.log(`Table "${tableName}" was created`);
                        seedFunction(docClient, tableName);
                    }
                });
            }
            if (!loadedTables.includes(tableName)) {
                createTable();
            } else {
                dynamodb.deleteTable({ TableName: tableName }, (err, data) => {
                    createTable();
                })
            }
        } 
    })
})

