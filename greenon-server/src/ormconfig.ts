import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import { User, Device, DeviceData } from "./entity";

dotenv.config();

const ormconfig: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Device, DeviceData],
};

export default ormconfig;
