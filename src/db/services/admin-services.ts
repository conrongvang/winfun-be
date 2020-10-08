import mysql from "mysql";
import { tableNames } from "../database-constant";
const mySQLConfig = require("../dbconfig.json");

export function adminLogin(admin: string, password: string): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.ADMINS} WHERE `, (error, result) => {
        connection.end();
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  } catch (err) {
    throw err;
  }
}
