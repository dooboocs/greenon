import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import session from "express-session";
import flash from "connect-flash";

import passport from "passport";
import passportConfig from "./passport";

import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import deviceRouter from "./routes/device";
import bodyParser from "body-parser";
import connectionOptions from "./ormconfig";

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

    const prod = process.env.NODE_ENV === "production";

    const app = express();
    app.use(cors({ origin: "*", credentials: true }));

    app.use(passport.initialize());
    passportConfig();

    app.set("port", process.env.PORT || 3000);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
          httpOnly: true,
          secure: false,
        },
      })
    );

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/", indexRouter);
    app.use("/users", userRouter);
    app.use("/devices", deviceRouter);

    var listener = app.listen(3000, () => {
      console.log(`Express server is running`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
