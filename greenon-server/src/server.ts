import "dotenv/config";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import session from "express-session";
import flash from "connect-flash";
import {
  authRouter,
  userRouter,
  deviceRouter,
  noticeRouter,
  requestRouter,
} from "./routes/index";
import connectionOptions from "./ormconfig";
import schedule from "node-schedule";

import swaggerUI from "swagger-ui-express";
import specs from "./specs";
import {
  createSampleDeviceData,
  clearDeviceData,
} from "./controllers/deviceController";
import moment from "moment";
import bodyParser from "body-parser";

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

// Connect Typeorm mysql
createConnection(connectionOptions)
  .then(async () => {
    console.log("Database Connected :)");

    // Store DeviceData every 10 minutes
    schedule.scheduleJob("0 */10 * * * *", () => {
      createSampleDeviceData();
      console.log(moment().format("HH:mm:ss"));
    });

    // Clear DeviceData on 00:00:00
    schedule.scheduleJob("0 0 0 * * *", () => {
      clearDeviceData();
      createSampleDeviceData();
    });
  })
  .catch((error) => console.log(error));

const app = express();
app.use(cors());

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 180000,
    },
  })
);

app.use(flash());

app.use("/uploads", express.static(__dirname + "/../uploads"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/devices", deviceRouter);
app.use("/notices", noticeRouter);
app.use("/requests", requestRouter);

app.listen(3000, () => {
  console.log(`Express server is running`);
});
