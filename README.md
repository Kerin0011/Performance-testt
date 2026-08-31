# RiwimediCare API

This repository contains the backend API for managing supply requests for clinics, implemented following the assessment requirements.

Please replace the placeholder values below (name, clan, repo URL) with your real information before submitting.

Summary
- Name: Kerin Barranco
- Clan:  node JS PM
- Technologies: Node.js, TypeScript, Express, Sequelize, PostgreSQL, JWT, Multer, Swagger, Docker

Quick start

1. Copy `.env.example` to `.env` and update `DATABASE_URL` (Postgres) and `JWT_SECRET`.

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Run in development (watch mode):

```bash
npm run dev
```

Available npm scripts
- `npm run dev` — start in development with automatic restarts
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled app
- `npm test` — run Jest tests with coverage

Environment variables (example)

Create a `.env` with values similar to:

```
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/riwimedicare
JWT_SECRET=your_jwt_secret
```

API endpoints (high level)
- `POST /api/users/register` — Register user (public). The register endpoint accepts a `role` field (e.g. `ADMIN` or `MANAGER`) for testing purposes.
- `POST /api/users/login` — Login, returns JWT token.
- `POST /api/clinics` — Create clinic (ADMIN only). Validates unique NIT.
- `GET /api/clinics` — List clinics (auth required).
- `POST /api/warehouses` — Create warehouse (ADMIN only).
- `POST /api/medications` — Create medication (ADMIN only).
- `POST /api/requests` — Create supply request (authenticated users). Validates quantity > 0 and inventory availability when assigning.
- `POST /api/requests/:id/assign` — Assign a request to a warehouse (ADMIN only).
- `PATCH /api/requests/:id/status` — Update request status (authenticated). Status transitions check inventory on `APPROVED`.
- `POST /api/seed` — Upload a JSON file (multipart/form-data `file` field) to seed the database (ADMIN only).
- Swagger UI is available at `/docs` when the server is running.

Seed example

Use the seed endpoint to upload a JSON file with arrays for `users`, `clinics`, `warehouses`, `medications`, `inventories`, `requests`.

Example using `curl`:

```bash
curl -X POST -H "Authorization: Bearer <ADMIN_TOKEN>" -F "file=@data.json" http://localhost:3000/api/seed
```
Docker

You can run the application and Postgres with Docker Compose:

```bash
docker-compose up --build
```

This will expose the API on port `3000` and a Postgres instance accessible to the app.

Submission checklist (per assessment)
- Project organized and typed with TypeScript.
- JSDoc-style comments added where appropriate in source files.
- Seed endpoint implemented with `multer`.
- Authentication with JWT and role-based access control.
- Logical validations: clinic NIT uniqueness, inventory checks, valid request states, quantity > 0.
- Soft deletion strategy: requests use a `deleted` flag for logical deletes if implemented.
- Dockerfile and `docker-compose.yml` included.


Repository URL :
https://github.com/Kerin0011/Performance-testt/


