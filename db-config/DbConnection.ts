// // prod
// import { DataSource } from "typeorm";
// import * as entities from "../entities/Context";
// import dotenv from "dotenv";
// dotenv.config();

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
import { DataSource } from "typeorm";
import * as entities from "../entities/Context";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
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

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established successfully!");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

export { AppDataSource };