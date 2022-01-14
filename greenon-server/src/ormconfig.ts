import { ConnectionOptions } from "typeorm";
import { User, Device, DeviceData, Notice, Request } from "./entity";

const ormconfig: ConnectionOptions = {
  type: "mysql",
  host: "52.79.146.233",
  port: 3306,
  username: "root",
  password: "root",
  database: "dev",
  synchronize: true,
  logging: false,
  entities: [User, Device, DeviceData, Notice, Request],
};

export default ormconfig;
