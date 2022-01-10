import express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { verifyToken } from "../modules/jwt";

const user = express.Router();

interface Token {
  id: string;
  iat: number;
}

user.get("/", async (req, res) => {
  const userRepo = getRepository(User);
  const users = await userRepo.find();
  res.status(200).send(users);
});

user.get("/detail", async (req, res) => {
  const userRepo = getRepository(User);
  const token = req.headers.authorization.split("Bearer ")[1];
  verifyToken(token)
    .then(async (decoded) => {
      const user = await userRepo.findOne(decoded.id);
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

user.put("/", async (req, res) => {
  const userRepo = getRepository(User);
  const token = req.headers.authorization.split("Bearer ")[1];
  verifyToken(token)
    .then(async (decoded) => {
      const user = await userRepo.findOne(decoded.id);
      try {
        await userRepo.update(user.id, req.body);
        return res.sendStatus(200);
      } catch (err) {
        return res.status(400).send("Update user error");
      }
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
  if (!user) {
    return res.status(400).send("Cannot find user");
  }
});

user.delete("/", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  verifyToken(token)
    .then(async (decoded) => {
      const user = await getRepository(User).findOne(decoded.id);
      try {
        await getRepository(User).delete(user.id);
        return res.sendStatus(200);
      } catch (err) {
        return res.status(400).send({ error: err });
      }
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

export default user;
