import "dotenv/config";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
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
    schedule.scheduleJob("* */10 * * * *", () => {
      createSampleDeviceData();
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "KeyForCookie",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

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
