import { getRepository } from "typeorm";
import { Request } from "../entity";

export const createRequest = async (req, res) => {
  console.log("File: ", req.file);
  const request = await getRepository(Request).create({
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    title: req.body.title,
    content: req.body.content,
    image: req.file.path ? req.file.path : null,
  });

  const result = await getRepository(Request).save(request);

  res.status(200).json(result);
};

export const getRequests = async (req, res) => {
  const requests = await getRepository(Request).find();
  res.status(200).json(requests);
};
