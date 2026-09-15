# Node Express Service Fixture

This is the first source-only application for the DeployFlow backend. It is intentionally small and does not contain deployment artifacts. The backend should infer its runtime, npm commands, HTTP port, health endpoint, and environment-variable usage from this repository before generating infrastructure files.

## Run locally

```bash
npm install
PORT=4587 APP_GREETING="Hello from the fixture" npm start
```

The service listens on `0.0.0.0:4587` by default. `HOST`, `PORT`, `APP_GREETING`, and `NODE_ENV` are runtime configuration inputs.

Endpoints:

- `GET /` returns the configured greeting and service metadata.
- `GET /healthz` returns `{ "status": "ok" }` for health checks.
- `GET /api/info` returns non-sensitive runtime information.

Run the tests with:

```bash
npm test
```

The fixture intentionally has no Dockerfile, CI workflow, Kubernetes manifests, Helm chart, Terraform files, database connection, or secret values. Those are the artifacts that the platform will later propose and create through a pull request.
