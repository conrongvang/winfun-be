import mysql from "mysql";
import nodemailer from "nodemailer";
import moment from "moment";
import path from 'path'
import fs from 'fs'
import { RegisterNow } from "../../models/ModelDeclare";
import { tableNames } from "../database-constant";
const mySQLConfig = require("../dbconfig.json");

export function insertNewRegisterApplication(newRegister: RegisterNow): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    /** Use UTC as created date */
    newRegister.createdDate = moment().utc().format();

    return new Promise((resolve, reject) => {
      const res = connection.query(`INSERT INTO ${tableNames.REGISTER_NOW} SET ?`, newRegister, (error, result) => {
        connection.end();
        if (error) {
          reject(error);
          return;
        }

        /**
         * if send email to the host is failed
         * then set the "sent" status of that record is 0 (it means haven't sent yet)
         **/
        try {
          sendRegisterInfoToHostEmail(newRegister);
        } catch (err) {
          updateSentEmailStatus(newRegister, 0);
        }

        resolve({ ...res.values, id: result.insertId });
      });
    });
  } catch (err) {
    throw err;
  }
}

export function updateSentEmailStatus(newRegister: RegisterNow, status: number): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${tableNames.REGISTER_NOW} SET sent = ? WHERE phoneNumber = ? and email = ?`,
        [status, newRegister.phoneNumber, newRegister.email],
        (error) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }
          resolve(true);
        }
      );
    });
  } catch (err) {
    throw err;
  }
}

export function sendRegisterInfoToHostEmail(newRegister: RegisterNow, resend: boolean = false) {
  try {
    const { phoneNumber, name, email } = newRegister;
    const emailConfigPath = path.resolve("./src/emailConfig.json")
    var emailConfig = JSON.parse(fs.readFileSync(emailConfigPath, 'utf8'));
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailConfig.hostEmail,
        pass: emailConfig.hostEmailPassword,
      },
    });

    const mailOptions = {
      to: emailConfig.receiveEmails,
      subject: `${resend ? "Re-send:" : ""}${emailConfig.emailSubject} (${moment().format(
        "Do MMMM YYYY, h:mm:ss a"
      )})`,
      html: `
      <h1>New user register</h1>
      <p>NAME: ${name}</p>
      <p>EMAIL: ${email}</p>
      <p>PHONE: ${phoneNumber}</p>
      <p>-----------------------</p>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email sent: " + info.response);
        updateSentEmailStatus(newRegister, 1);
      }
    });
  } catch (err) {
    throw err;
  }
}

export async function resendRegisterInfoToHostEmail(registerId: number) {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    let register : RegisterNow = {} as RegisterNow
    const data : RegisterNow = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${tableNames.REGISTER_NOW} WHERE id = ${registerId} LIMIT 1`,
        (error, result) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }
          
          register = result[0]
          resolve(result[0]);
        }
      );
    });

    sendRegisterInfoToHostEmail(data, true)
    updateSentEmailStatus(register, 1);
  } catch (err) {
    throw err;
  }
}

export function fetchAllRegisterNow(): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.REGISTER_NOW}`, (error, result) => {
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
