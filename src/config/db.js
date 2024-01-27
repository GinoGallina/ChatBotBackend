// eslint-disable-next-line import/no-extraneous-dependencies
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Puedes habilitar esto para ver las consultas SQL en la consola
  },
);

export default sequelize;
