import { Device, DeviceData, User } from "../entity";
import { getRepository } from "typeorm";

export const getDevices = async (req, res) => {
  try {
    const devices = await getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.device_data", "device_data")
      .where("device.user = :userId", { userId: res.locals.userId })
      .getMany();

    res.json(devices);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getDeviceInfo = async (req, res) => {
  try {
    const device = await getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.device_data", "device_data")
      .leftJoinAndSelect("device.user", "user")
      .where("device.id = :id", { id: req.params.id })
      .where("device.user = :userId", { userId: res.locals.userId })
      .getOne();

    return res.json(device);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createDevice = async (req, res) => {
  try {
    const user = await getRepository(User).findOne(res.locals.userId);

    if (!user) {
      return res
        .status(401)
        .json({ error: { message: "Authentication Error" } });
    }

    const newDevice = await getRepository(Device).create({
      ...req.body,
      user: user.id,
    });

    return getRepository(Device)
      .save(newDevice)
      .then((device) => res.json(device));
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateDevice = async (req, res) => {
  try {
    await getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.user", "user")
      .where("device.id = :id", { id: req.params.id })
      .andWhere("device.user = :userId", { userId: res.locals.userId })
      .getOne()
      .then((device) => {
        return getRepository(Device).update(device.id, req.body);
      });

    return res.json(req.body);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const result = await getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.user", "user")
      .where("device.id = :id", { id: req.params.id })
      .andWhere("device.user = :userId", { userId: res.locals.userId })
      .getOne()
      .then((device) => {
        return getRepository(Device).remove(device);
      });

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateAllDevice = async (req, res) => {
  try {
    await getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.user", "user")
      .where("device.user = :userId", { userId: res.locals.userId })
      .getMany()
      .then((devices) => {
        devices.forEach((device) => {
          getRepository(Device).update(device.id, req.body);
        });
      });

    return res.status(200).send(req.body);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createSampleDeviceData = async () => {
  const all_devices = await getRepository(Device).find();

  all_devices.forEach(async (device) => {
    const sampleDeviceData = await getRepository(DeviceData).create({
      bio_air_roll: Math.round(Math.random() * (90 - 30)) + 30,
      air_quailty: Math.round(Math.random() * (90 - 30)) + 30,
      food_poisoning: Math.round(Math.random() * (90 - 30)) + 30,
      find_dust: Math.round(Math.random() * (90 - 30)) + 30,
      temperature: Math.round(Math.random() * (90 - 30)) + 30,
      humedity: Math.round(Math.random() * (8 - 3) + 3) / 10,
      device,
    });

    await getRepository(DeviceData).save(sampleDeviceData);
  });
};

export const clearDeviceData = async () => {
  await getRepository(DeviceData).clear();
};
