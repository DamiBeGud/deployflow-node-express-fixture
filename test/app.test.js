import assert from "node:assert/strict";
import test from "node:test";

import { createApp } from "../src/app.js";

test("application endpoints identify the next automatic deployment test release", async () => {
  const server = createApp().listen(0);
  const { port } = server.address();

  try {
    for (const path of ["/", "/api/info"]) {
      const response = await fetch(`http://127.0.0.1:${port}${path}`);
      assert.equal(response.status, 200);
      assert.equal((await response.json()).release, "phase7-release-3");
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

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
