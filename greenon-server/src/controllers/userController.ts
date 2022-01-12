import { getRepository } from "typeorm";
import { User } from "../entity";
import { verifyToken } from "../modules/jwt";

export const getUser = async (req, res) => {
  try {
    const users = await getRepository(User).find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    verifyToken(req).then(async (decoded) => {
      const user = await getRepository(User).findOne(decoded.id);
      res.json(user);
    });
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userRepo = getRepository(User);
    verifyToken(req).then(async (decoded) => {
      const user = await userRepo.findOne(decoded.id);
      await userRepo.update(user.id, req.body);
      const updatedUser = await userRepo.findOne(user.id);
      res.json(updatedUser);
    });
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userRepo = getRepository(User);
    verifyToken(req).then(async (decoded) => {
      const user = await userRepo.findOne(decoded.id);
      await userRepo.delete(user.id);
      return res.json({ result: "ok" });
    });
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};
