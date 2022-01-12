import express from "express";
import passport from "passport";
import { register } from "ts-node";
import { getRepository } from "typeorm";
import { login } from "../controllers/authController";
import { User } from "../entity/User";

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth API
 */
const router = express.Router();

/**
 * @swagger
 * paths:
 *  /login:
 *    post:
 *      summary: 로그인
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Access Token 발급
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Token"
 *        "401":
 *          description: 아이디 혹은 비밀번호 틀림
 *
 *  /register:
 *    post:
 *      summary: 회원가입
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                name:
 *                  type: string
 *                phone:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Access Token 발급
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Token"
 */

router.post("/login", login);
router.post("/register", register);

export default router;
