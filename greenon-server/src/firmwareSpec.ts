import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Greenon API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/firmware.ts", "./dist/routes/firmware.js"],
};

export default swaggerJSDoc(options);
