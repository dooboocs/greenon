import express from "express";
import {
  changePassword,
  deleteUser,
  getUser,
  getUserInfo,
  updateUser,
} from "../controllers/userController";
import { verifyToken } from "../modules/jwt";

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
 *  /users/change_password:
 *    post:
 *      summary: 유저 비밀번호 변경
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: Success
 *
 */
user.get("/", getUser);
user.put("/", verifyToken, updateUser);
user.delete("/", verifyToken, deleteUser);
user.get("/detail", verifyToken, getUserInfo);
user.post("/change_password", verifyToken, changePassword);

export default user;
