import express from "express";

const DEFAULT_PORT = 4587;

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/", (_request, response) => {
    response.json({
      service: "node-express-service-fixture",
      message: process.env.APP_GREETING || "Hello from the Express fixture",
      environment: process.env.NODE_ENV || "development",
    });
  });

  app.get("/healthz", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.get("/api/info", (_request, response) => {
    response.json({
      service: "node-express-service-fixture",
      port: Number(process.env.PORT || DEFAULT_PORT),
      hasGreetingConfiguration: Boolean(process.env.APP_GREETING),
    });
  });

  return app;
}

export { DEFAULT_PORT };
