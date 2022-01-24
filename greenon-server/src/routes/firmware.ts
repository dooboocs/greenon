import express from "express";

/**
 * @swagger
 * tags:
 *  name: Firmware
 *  description: Firmware Communication
 */
const firmware = express.Router();

/**
 * @swagger
 * paths:
 *  /firmware:
 *    get:
 *      summary: Get Method
 *      tags: [Firmware]
 *      responses:
 *        "200":
 *          description: Success
 *    post:
 *      summary: Post Method
 *      tags: [Firmware]
 *      responses:
 *        "200":
 *          description: Success
 *    put:
 *      summary: Put Method
 *      tags: [Firmware]
 *      responses:
 *        "200":
 *          description: Success
 *    delete:
 *      summary: Delete Method
 *      tags: [Firmware]
 *      responses:
 *        "200":
 *          description: Success
 */

firmware.get("/", (req, res) => {
  res.sendStatus(200);
});

firmware.post("/", (req, res) => {
  res.sendStatus(200);
});

firmware.put("/", (req, res) => {
  res.sendStatus(200);
});

firmware.delete("/", (req, res) => {
  res.sendStatus(200);
});

export default firmware;
