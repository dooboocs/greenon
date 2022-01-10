import jwt from "jsonwebtoken";

interface Token {
  id: string;
  iat: number;
}

export const verifyToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded as Token;
};
