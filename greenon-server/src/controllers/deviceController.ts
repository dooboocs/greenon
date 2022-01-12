import { Device, User } from "../entity";
import { getRepository } from "typeorm";
import { verifyToken } from "../modules/jwt";

export const getDevices = (req, res) => {
  try {
    verifyToken(req).then(async (decoded) => {
      const devices = await getRepository(Device)
        .createQueryBuilder("device")
        .leftJoinAndSelect("device.device_data", "device_data")
        .where("device.user = :userId", { userId: decoded.id })
        .getMany();

      res.json(devices);
    });
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};

export const getDeviceInfo = (req, res) => {
  try {
    verifyToken(req).then(async (decoded) => {
      const device = await getRepository(Device)
        .createQueryBuilder("device")
        .leftJoinAndSelect("device.device_data", "device_data")
        .leftJoinAndSelect("device.user", "user")
        .where("device.id = :id", { id: req.params.id })
        .where("device.user = :userId", { userId: decoded.id })
        .getOne();

      return res.json(device);
    });
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};

export const createDevice = (req, res) => {
  try {
    verifyToken(req).then(async (decoded) => {
      const user = await getRepository(User).findOne(decoded.id);

      const newDevice = await getRepository(Device).create({
        ...req.body,
        user: user.id,
      });

      return getRepository(Device)
        .save(newDevice)
        .then((device) => res.json(device));
    });
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};

export const updateDevice = (req, res) => {
  try {
    verifyToken(req).then(async (decoded) => {
      const result = await getRepository(Device)
        .createQueryBuilder("device")
        .leftJoinAndSelect("device.user", "user")
        .where("device.id = :id", { id: req.params.id })
        .andWhere("device.user = :userId", { userId: decoded.id })
        .getOne()
        .then((device) => {
          return getRepository(Device).update(device.id, req.body);
        });

      return res.json(req.body);
    });
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};

export const deleteDevice = (req, res) => {
  try {
    verifyToken(req).then(async (decoded) => {
      const result = await getRepository(Device)
        .createQueryBuilder("device")
        .leftJoinAndSelect("device.user", "user")
        .where("device.id = :id", { id: req.params.id })
        .andWhere("device.user = :userId", { userId: decoded.id })
        .getOne()
        .then((device) => {
          return getRepository(Device).remove(device);
        });

      return res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).json({ error: { message: error } });
  }
};
