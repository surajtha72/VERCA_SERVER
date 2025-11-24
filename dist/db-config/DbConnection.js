"use strict";
// // prod
// import { DataSource } from "typeorm";
// import * as entities from "../entities/Context";
// import dotenv from "dotenv";
// dotenv.config();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// const AppDataSource = new DataSource({
//   type: "mysql",
//   host: "127.0.0.1",
//   port: 3306,
//   username: "dbadmin",
//   password: "db@dmin4impsoneDb",
//   database: "impsone_verka",
//   entities: entities,
//   synchronize: false,
//   logging: true,
// });
// AppDataSource.initialize() 
//   .then(() => {
//     console.log("Database connection established successfully!");
//   })
//   .catch((error) => {
//     console.error("Failed to connect to the database:", error);
//   });
// export { AppDataSource };
//local
const typeorm_1 = require("typeorm");
const entities = __importStar(require("../entities/Context"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: entities,
    synchronize: true,
    logging: true,
});
exports.AppDataSource = AppDataSource;
AppDataSource.initialize()
    .then(() => {
    console.log("Database connection established successfully!");
})
    .catch((error) => {
    console.error("Failed to connect to the database:", error);
});
