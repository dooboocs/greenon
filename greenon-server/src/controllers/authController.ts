import { getRepository } from "typeorm";
import { User } from "../entity";

export const login = async (req, res) => {
  const user = await getRepository(User).findOne({ email: req.body.email });

  if (!user) {
    res.status(401).json({ error: "Cannot find user" });
  } else {
    const comparePassword = await user.comparePassword(req.body.password);

    if (!comparePassword) {
      res.status(401).json({ error: "Incorrect password" });
    } else {
      const accessToken = await user.generateToken();
      res.json({ token: accessToken });
    }
  }
};

export const register = async (req, res) => {
  try {
    const userRepo = getRepository(User);
    const exist = await userRepo.findOne({ email: req.body.email });
    if (exist) {
      res.status(400).json({ error: "Already Exist" });
    } else {
      const newUser = await userRepo.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
      });
      const result = await userRepo.save(newUser);
      const accessToken = await result.generateToken();
      res.json({ token: accessToken });
    }
  } catch (error) {
    res.status(400).json({ erorr: { message: error } });
  }
};
