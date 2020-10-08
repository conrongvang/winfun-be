import express, { Response, Request } from "express";
import mysql from "mysql";
import { RegisterNowAPIs } from './apis/register-now'
import { EventAPIs } from './apis/events'
import { UpdateAPIs } from './apis/upload-download'
import { AnonymousCommentAPIs } from "./apis/anonymous-comment";
import { EmailInfoAPIs } from "./apis/email-info";
import { FeaturesAPIs } from './apis/features'
const server = express();
const mySQLConfig = require('./db/dbconfig.json');


var bodyParser = require("body-parser");
server.use(bodyParser.json()); // to support JSON-encoded bodies
server.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

server.use(express.json()); // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

server.use(function (_: Request, res: Response, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

const connection = mysql.createConnection(mySQLConfig);

connection.on("connect", () => {
	// console.log("We are connected to the DB");
});

connection.connect();

server.use('/', [RegisterNowAPIs, EventAPIs, UpdateAPIs, AnonymousCommentAPIs, EmailInfoAPIs, FeaturesAPIs]);
server.listen(5000, function () {
  console.log("listening on *:5000");
});

connection.end();

export const dbConnection = connection