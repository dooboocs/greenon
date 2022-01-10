import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Greenon API Server");
});

router.post("/login", async (req, res) => {
  const user = await getRepository(User).findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ error: "Cannot find user" });
  }

  const compareResult = await user.comparePassword(req.body.password);

  if (!compareResult) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  const accessToken = await user.generateToken();

  return res.status(200).json({ token: accessToken });
});

router.get("/login-fail", (req, res) => {
  return res.status(401).send(req.flash());
});

router.post("/register", async (req, res, next) => {
  try {
    const exist = await getRepository(User).findOne({ email: req.body.email });
    if (exist) {
      return res.status(400).send("Already Exists");
    }
    const newUser = await getRepository(User).create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
    });
    const result = await getRepository(User).save(newUser);
    const accessToken = await result.generateToken();
    return res.status(200).send({ token: accessToken });
  } catch (err) {
    return next(err);
  }
});

export default router;
