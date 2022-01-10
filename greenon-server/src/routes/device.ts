import express, { Request, Response, NextFunction } from "express";
import { getConnection, getRepository } from "typeorm";
import { User } from "../entity";
import { Device } from "../entity/Device";
import { DeviceData } from "../entity/DeviceData";
import { verifyToken } from "../modules/jwt";

const device = express.Router();

// Get User's Devices
device.get("/", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  verifyToken(token)
    .then(async (decoded) => {
      const devices = await getRepository(Device)
        .createQueryBuilder("device")
        .leftJoinAndSelect("device.device_data", "device_data")
        .where("device.user = :userId", { userId: decoded.id })
        .getMany();

      return res.status(200).send(devices);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({ error: err });
    });
});

// Get User's DeviceData
device.get("/:id", async (req: Request, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  verifyToken(token).then(async (decoded) => {
    const device = await getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.device_data", "device_data")
      .leftJoinAndSelect("device.user", "user")
      .where("device.id = :id", { id: req.params.id })
      .where("device.user = :userId", { userId: decoded.id })
      .getOne();

    return res.status(200).send(device);
  });
});

// Get all DeviceData (Admin)
device.get("/data", async (req, res) => {
  const deviceData = await getRepository(DeviceData)
    .createQueryBuilder("device_data")
    .leftJoinAndSelect("device_data.device", "device")
    .getMany();
  return res.sendStatus(200).json({ payload: deviceData });
});

// Create User's Device
device.post("/", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  verifyToken(token).then(async (decoded) => {
    const user = await getRepository(User).findOne(decoded.id);

    const newDevice = await getRepository(Device).create({
      ...req.body,
      user: user.id,
    });

    return getRepository(Device)
      .save(newDevice)
      .then((device) => res.status(200).send(device));
  });
});

// Delete User's Device
device.delete("/:id", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  return verifyToken(token).then(async (decoded) => {
    try {
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
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  });
});

device.put("/:id", async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  return verifyToken(token).then(async (decoded) => {
    try {
      const result = await getRepository(Device)
        .createQueryBuilder("device")
        .leftJoinAndSelect("device.user", "user")
        .where("device.id = :id", { id: req.params.id })
        .andWhere("device.user = :userId", { userId: decoded.id })
        .getOne()
        .then((device) => {
          return getRepository(Device).update(device.id, req.body);
        });

      return res.status(200).send(req.body);
    } catch (err) {
      res.status(200).send({ error: "Update Error" });
    }
  });
});

export default device;
