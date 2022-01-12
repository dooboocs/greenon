import { Request } from "express";
import jwt from "jsonwebtoken";

interface Token {
  id: string;
  iat: number;
}

export const verifyToken = async (req: Request) => {
  const decoded = jwt.verify(
    req.headers.authorization.split("Bearer ")[1],
    process.env.JWT_SECRET
  );
  return decoded as Token;
};
