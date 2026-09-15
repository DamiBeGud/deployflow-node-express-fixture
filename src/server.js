import { createServer } from "node:http";

import { createApp, DEFAULT_PORT } from "./app.js";

const port = Number.parseInt(process.env.PORT || DEFAULT_PORT, 10);
const host = process.env.HOST || "0.0.0.0";
const server = createServer(createApp());

server.listen(port, host, () => {
  console.log(`node-express-service-fixture listening on ${host}:${port}`);
});

function shutdown(signal) {
  console.log(`received ${signal}; shutting down`);
  server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
