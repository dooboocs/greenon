import express from "express";
import multer from "multer";
import path from 'path'
import { createRequest, getRequests } from "../controllers/requestController";

/**
 * @swagger
 * tags:
 *  name: Requests
 *  description: Request API
 */

const request = express.Router();

/**
 * @swagger
 * paths:
 *  /requests:
 *    get:
 *      summary: 문의 목록 조회
 *      tags: [Requests]
 *      responses:
 *        "200":
 *          description: Success
 *    post:
 *      summary: 문의 생성
 *      tags: [Requests]
 *      responses:
 *        "200":
 *          description: Success
 */

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname))
    }
  })
})

request.get("/", getRequests);
request.post("/", upload.single("image"), createRequest);

export default request;
