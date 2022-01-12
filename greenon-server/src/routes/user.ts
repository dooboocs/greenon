import express from "express";
import {
  deleteUser,
  getUser,
  getUserInfo,
  updateUser,
} from "../controllers/userController";

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User API
 */
const user = express.Router();

/**
 * @swagger
 * paths:
 *  /users:
 *    get:
 *      summary: 유저 목록 조회
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: Success
 *    put:
 *      summary: 유저 업데이트
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: Success
 *    delete:
 *      summary: 유저 삭제
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: Success
 *
 *  /users/detail:
 *    get:
 *      summary: 유저 정보 조회
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: Success
 *
 *
 */
user.get("/", getUser);
user.get("/detail", getUserInfo);
user.put("/", updateUser);
user.delete("/", deleteUser);

export default user;
