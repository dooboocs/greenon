import express from "express";
import { kakaoLogin, login, register } from "../controllers/authController";

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth API
 */
const auth = express.Router();

/**
 * @swagger
 * paths:
 *  /auth/login:
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
 *  /auth/register:
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
 *  /auth/kakao:
 *    get:
 *      summary: 카카오 로그인
 *      tags: [Auth]
 *      responses:
 *        "200":
 *          description: Access Token 발급
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Token"
 *
 */

auth.post("/login", login);
auth.post("/register", register);

auth.get("/kakao", (req, res) => {
  const callback_uri = "http://52.79.146.233:3000/auth/kakao/callback";

  res.redirect(
    `https://kauth.kakao.com/oauth/authorize?client_id=a901df17d13f61c89a412946009caaec&redirect_uri=${callback_uri}&response_type=code&prompt=login`
  );
});

auth.get("/kakao/callback", kakaoLogin);

export default auth;
