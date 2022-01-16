import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Greenon API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "http://52.79.146.233:3000",
      },
    ],
  },
  apis: ["./src/entity/*.ts", "./src/routes/*.ts", "./routes/*.js"],
};

export default swaggerJSDoc(options);
