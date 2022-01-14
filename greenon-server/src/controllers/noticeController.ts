import { getRepository } from "typeorm";
import { Notice } from "../entity";

export const getNotice = async (req, res) => {
  const notices = await getRepository(Notice).find();
  res.status(200).json(notices);
};

export const createNotice = async (req, res) => {
  const notice = await getRepository(Notice).create({
    title: req.body.title,
    content: req.body.content,
    photoURL: req.body.photoURL,
  });

  const result = await getRepository(Notice).save(notice);

  res.status(200).json(result);
};
