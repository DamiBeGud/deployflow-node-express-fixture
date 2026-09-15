import assert from "node:assert/strict";
import test from "node:test";

import { createApp } from "../src/app.js";

test("health endpoint reports an ok service", async () => {
  const server = createApp().listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/healthz`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test("root endpoint uses the configured greeting", async () => {
  const previousGreeting = process.env.APP_GREETING;
  process.env.APP_GREETING = "Fixture greeting";
  const server = createApp().listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).message, "Fixture greeting");
  } finally {
    if (previousGreeting === undefined) {
      delete process.env.APP_GREETING;
    } else {
      process.env.APP_GREETING = previousGreeting;
    }
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
