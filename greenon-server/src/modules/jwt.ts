import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const clientToken = req.headers.authorization.split("Bearer ")[1];
    console.log("Client Token: ", clientToken);
    const decoded: any = jwt.verify(clientToken, "KeyForJWTToken");

    if (decoded) {
      res.locals.userId = decoded.id;
      next();
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "token expired" });
  }
};
