import mysql from "mysql";
import { tableNames } from "../database-constant";
import { WinfunEvent } from "../../models/ModelDeclare";
import { preparedData } from '../../utils'
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
        \`location\` = ${preparedData(location)}, 
        \`beginDatetime\` = ${preparedData(beginDatetime)},
        \`endDatetime\` = ${preparedData(endDatetime)}, 
        \`detailLink\` = ${preparedData(detailLink)}, 
        \`descriptions\` = ${preparedData(descriptions)}, 
        \`show\` = ${show || 1},
        \`sequence\` = ${sequence || -1},
        \`eventName\` = ${preparedData(eventName)},
        \`createdDate\` = ${preparedData(createdDate)},
        \`imageURI\` = ${preparedData(imageURI)}`
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
        eventName = ${preparedData(eventName)},
        location = ${preparedData(location)},
        beginDatetime = ${preparedData(beginDatetime)},
        endDatetime = ${preparedData(endDatetime)},
        descriptions = ${preparedData(descriptions)},
        detailLink = ${preparedData(detailLink)},
        \`show\` = ${show || 1},
        sequence = ${sequence || -1},
        imageURI = ${preparedData(imageURI)}
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

export function deleteEvent(eventId: number): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${tableNames.EVENTS}
        SET
        deleted = 1
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

export function fetchAllExistsEvent(): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.EVENTS} WHERE deleted != 1`, (error, result) => {
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