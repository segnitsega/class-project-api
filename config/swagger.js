import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Capstone API",
      version: "1.0.0",
      description: "API for capstone project",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server",
      },
      {
        url: 'https://capstone-api-dwzu.onrender.com',
        description: "Production server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
