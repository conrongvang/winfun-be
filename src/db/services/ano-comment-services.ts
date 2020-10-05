import mysql from "mysql";
import moment from "moment";
import { tableNames } from "../database-constant";
import { AnonymousComment } from "../../models/ModelDeclare";
import { preparedData } from "../../utils";
const mySQLConfig = require("../dbconfig.json");

export function addAnonymousComment(newComment: AnonymousComment): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    /** Use UTC as created date */
    newComment.createdDate = moment().utc().format();

    return new Promise((resolve, reject) => {
      const res = connection.query(`INSERT INTO ${tableNames.ANONYMOUS_COMMENT} SET ?`, newComment, (error, result) => {
        connection.end();
        if (error) {
          reject(error);
          return;
        }
        resolve({ ...res.values, id: result.insertId });
      });
    });
  } catch (err) {
    throw err;
  }
}

export function fetchAllAnonymousComments(): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.ANONYMOUS_COMMENT}`, (error, result) => {
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

export function updateShowStatus(anoCommentId: number, showStatus: boolean): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(
      `UPDATE ${tableNames.ANONYMOUS_COMMENT}
      SET \`show\` = ${showStatus ? 1 : 0}
      WHERE id = ${anoCommentId}`.replace(/\n/g, ""), (error, result) => {
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

export function updateCommentSequence(anoCommentId: number, sequence: number): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(
      `UPDATE ${tableNames.ANONYMOUS_COMMENT}
      SET \`sequence\` = ${preparedData(sequence)}
      WHERE id = ${anoCommentId}`.replace(/\n/g, ""), (error, result) => {
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
