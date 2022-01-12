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

export const changePassword = async (req, res) => {
  try {
    verifyToken(req).then(async (decoded) => {
      const user = await getRepository(User).findOne(decoded.id);
      const compareResult = await user.comparePassword(req.body.password);

      if (!compareResult) {
        res.status(400).json({ error: { message: "Incorrect password" } });
      } else {
        await getRepository(User).update(user.id, {
          password: req.body.new_password,
        });
        res.status(200).json({ message: "OK" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};
