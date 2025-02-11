import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize({
  dialect: "mssql",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: 1433,
  dialectOptions: {
    options: {
      encrypt: false,
    },
  },
});
