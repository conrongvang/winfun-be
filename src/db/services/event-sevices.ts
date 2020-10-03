import mysql from "mysql";
import { tableNames } from "../database-constant";
import { WinfunEvent } from "../../models/ModelDeclare";
const mySQLConfig = require("../dbconfig.json");

export function insertEvent(event: WinfunEvent): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    let { location, beginDatetime, endDatetime, detailLink, descriptions, show, sequence, eventName, createdDate, imageURI = '' } = event;
    return new Promise((resolve, reject) => {
      const res = connection.query(
        `INSERT INTO ${tableNames.EVENTS} 
        SET 
        \`location\` = '${location}', 
        \`beginDatetime\` = '${beginDatetime}',
        \`endDatetime\` = '${endDatetime}', 
        \`detailLink\` = '${detailLink}', 
        \`descriptions\` = '${descriptions}', 
        \`show\` = ${show || 1},
        \`sequence\` = ${sequence || -1},
        \`eventName\` = '${eventName}',
        \`createdDate\` = '${createdDate}',
        \`imageURI\` = '${imageURI}'`
        .replace(/\n/g, ""), event, (error, result) => {
        connection.end();

        if (error) {
          reject(error);
          return;
        }
        resolve({...res.values, id: result.insertId});
      });
    });
  } catch (err) {
    throw err;
  }
}

export function updateEvent(eventId: number, event: WinfunEvent): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    let { location, beginDatetime, endDatetime, detailLink, descriptions, show, sequence, eventName, imageURI } = event;

    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${tableNames.EVENTS}
        SET
        eventName = '${eventName}',
        location = '${location}',
        beginDatetime = '${beginDatetime}',
        endDatetime = '${endDatetime}',
        descriptions = '${descriptions}',
        detailLink = '${detailLink}',
        \`show\` = ${show || 1},
        sequence = ${sequence || -1},
        imageURI = '${imageURI}'
        WHERE id = ${eventId}`.replace(/\n/g, ""),
        async (error) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }
          const updatedEvent = await fetchEventById(eventId);
          resolve(updatedEvent);
        }
      );
    });
  } catch (err) {
    throw err;
  }
}

export function fetchAllEvent(): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.EVENTS}`, (error, result) => {
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

export function fetchEventById(eventId: number): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.EVENTS} WHERE id = ${eventId} LIMIT 1`, (error, result) => {
        connection.end();
        if (error) {
          reject(error);
          return;
        }

        resolve(result[0]);
      });
    });
  } catch (err) {
    throw err;
  }
}
