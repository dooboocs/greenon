import "dotenv/config";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import passportConfig from "./passport";
import {
  authRouter,
  userRouter,
  deviceRouter,
  noticeRouter,
  requestRouter,
} from "./routes/index";
import connectionOptions from "./ormconfig";
import path from 'path'

import swaggerUI from "swagger-ui-express";
import specs from "./specs";

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

createConnection(connectionOptions)
  .then(() => {
    console.log("DB CONNECTION");

    const app = express();
    app.use(cors());

    app.use(passport.initialize());
    passportConfig();

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

    app.use('/uploads', express.static(__dirname + "/../uploads"))

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    app.use("/auth", authRouter);
    app.use("/users", userRouter);
    app.use("/devices", deviceRouter);
    app.use("/notices", noticeRouter);
    app.use("/requests", requestRouter);

    app.listen(3000, () => {
      console.log(`Express server is running`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
