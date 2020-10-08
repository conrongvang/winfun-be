import mysql from "mysql";
import { tableNames } from "../database-constant";
import { Feature } from "../../models/ModelDeclare";
import { preparedData } from '../../utils'
const mySQLConfig = require("../dbconfig.json");

export function insertFeature(feature: Feature): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    let { title, descriptions, image, show, sequence } = feature;
    
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO ${tableNames.FEATURES} 
        SET 
        \`title\` = ${preparedData(title)}, 
        \`descriptions\` = ${preparedData(descriptions)}, 
        \`show\` = ${show || 1},
        \`sequence\` = ${sequence},
        \`image\` = ${preparedData(image)}`
        .replace(/\n/g, ""), async (error, result) => {
        connection.end();
        if (error) {
          reject(error);
          return;
        }
        const insertedData = await fetchFeatureById(result.insertId)
        resolve(insertedData);
      });
    });
  } catch (err) {
    throw err;
  }
}

export function updateFeature(featureId: number, feature: Feature): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    let { title, descriptions, image, show, sequence } = feature;
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${tableNames.FEATURES}
        SET
        title = ${preparedData(title)},
        descriptions = ${preparedData(descriptions)},
        \`show\` = ${show},
        sequence = ${sequence || -1},
        image = ${preparedData(image)}
        WHERE id = ${featureId}`.replace(/\n/g, ""),
        async (error) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }
          const updatedEvent = await fetchFeatureById(featureId);
          resolve(updatedEvent);
        }
      );
    });
  } catch (err) {
    throw err;
  }
}

export function fetchAllFeature(): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.FEATURES}`, (error, result) => {
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

export function fetchFeatureById(featureId: number): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.FEATURES} WHERE id = ${featureId} LIMIT 1`, (error, result) => {
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