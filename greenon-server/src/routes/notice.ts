import express from "express";
import { createNotice, getNotice } from "../controllers/noticeController";

/**
 * @swagger
 * tags:
 *  name: Notices
 *  description: Notice API
 */
const notice = express.Router();

/**
 * @swagger
 * paths:
 *  /notices:
 *    get:
 *      summary: 공지사항 목록 조회
 *      tags: [Notices]
 *      responses:
 *        "200":
 *          description: Success
 *    post:
 *      summary: 공지사항 생성
 *      tags: [Notices]
 *      responses:
 *        "200":
 *          description: Success
 */

notice.get("/", getNotice);
notice.post("/", createNotice);

export default notice;
