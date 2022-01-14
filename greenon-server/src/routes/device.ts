import express from "express";
import {
  getDevices,
  getDeviceInfo,
  createDevice,
  updateDevice,
  deleteDevice,
  updateAllDevice,
} from "../controllers/deviceController";
import { verifyToken } from "../modules/jwt";

/**
 * @swagger
 * tags:
 *  name: Devices
 *  description: Device API
 */
const device = express.Router();

/**
 * @swagger
 * paths:
 *  /devices:
 *    get:
 *      summary: 디바이즈 목록 조회
 *      tags: [Devices]
 *      responses:
 *        "200":
 *          description: Success
 *    post:
 *      summary: 디바이스 추가
 *      tags: [Devices]
 *      responses:
 *        "200":
 *          description: Success
 *    put:
 *      summary: 전체 디바이스 업데이트
 *      tags: [Devices]
 *      responses:
 *        "200":
 *          description: Success
 *  /devices/:id:
 *    get:
 *      summary: 디바이스 정보 조회
 *      tags: [Devices]
 *      responses:
 *        "200":
 *          description: Success
 *    put:
 *      summary: 디바이스 업데이트
 *      tags: [Devices]
 *      responses:
 *        "200":
 *          description: Success
 *    delete:
 *      summary: 디바이스 삭제
 *      tags: [Devices]
 *      responses:
 *        "200":
 *          description: Success
 */

device.get("/", verifyToken, getDevices);
device.post("/", verifyToken, createDevice);
device.put("/", verifyToken, updateAllDevice);
device.get("/:id", verifyToken, getDeviceInfo);
device.put("/:id", verifyToken, updateDevice);
device.delete("/:id", verifyToken, deleteDevice);

export default device;
