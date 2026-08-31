export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "RiwiMediCare API",
    version: "1.0.0",
    description: "API for managing drug supply requests",
  },
  servers: [{ url: "http://localhost:3000" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      UserRegister: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string" },
          role: { type: "string", enum: ["ADMIN", "MANAGER"] },
        },
        required: ["name", "email", "password"],
      },
      UserLogin: {
        type: "object",
        properties: { email: { type: "string" }, password: { type: "string" } },
        required: ["email", "password"],
      },
      Clinic: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          nit: { type: "string" },
          contact: { type: "string" },
          deleted: { type: "boolean" },
        },
      },
      Warehouse: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          location: { type: "string" },
          deleted: { type: "boolean" },
        },
      },
      Medication: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          code: { type: "string" },
          deleted: { type: "boolean" },
        },
      },
      Inventory: {
        type: "object",
        properties: {
          id: { type: "string" },
          warehouseId: { type: "string" },
          medicationId: { type: "string" },
          quantity: { type: "integer" },
        },
      },
      Request: {
        type: "object",
        properties: {
          id: { type: "string" },
          clinicId: { type: "string" },
          medicationId: { type: "string" },
          quantity: { type: "integer" },
          warehouseId: { type: "string" },
          status: { type: "string" },
          deleted: { type: "boolean" },
        },
      },
    },
  },
  paths: {
    "/api/users/register": {
      post: {
        summary: "Register user (public)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserRegister" },
            },
          },
        },
        responses: {
          "201": { description: "User created" },
          "400": { description: "Bad request" },
          "409": { description: "Email exists" },
        },
      },
    },
    "/api/users/login": {
      post: {
        summary: "Login and receive JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserLogin" },
            },
          },
        },
        responses: {
          "200": { description: "JWT token" },
          "401": { description: "Invalid credentials" },
        },
      },
    },
    "/api/clinics": {
      get: {
        summary: "List clinics",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Array of clinics" } },
      },
      post: {
        summary: "Create clinic (ADMIN)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  nit: { type: "string" },
                  contact: { type: "string" },
                },
                required: ["name", "nit"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Clinic created" },
          "409": { description: "Duplicate NIT" },
        },
      },
    },
    "/api/clinics/{id}": {
      get: {
        summary: "Get clinic by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Clinic" },
          "404": { description: "Not found" },
        },
      },
      patch: {
        summary: "Update clinic (ADMIN)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: {
          "200": { description: "Updated" },
          "404": { description: "Not found" },
        },
      },
      delete: {
        summary: "Soft-delete clinic (ADMIN)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Deleted" },
          "404": { description: "Not found" },
        },
      },
    },
    "/api/clinics/{id}/requests": {
      get: {
        summary: "Get requests history for a clinic",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Array of requests" } },
      },
    },
    "/api/warehouses": {
      get: {
        summary: "List warehouses",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Array" } },
      },
      post: {
        summary: "Create warehouse (ADMIN)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  location: { type: "string" },
                },
                required: ["name"],
              },
            },
          },
        },
        responses: { "201": { description: "Created" } },
      },
    },
    "/api/warehouses/{id}": {
      get: {
        summary: "Get warehouse",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Warehouse" } },
      },
      patch: {
        summary: "Update warehouse (ADMIN)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Updated" } },
      },
      delete: {
        summary: "Soft-delete warehouse (ADMIN)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Deleted" } },
      },
    },
    "/api/medications": {
      get: {
        summary: "List medications",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Array" } },
      },
      post: {
        summary: "Create medication (ADMIN)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  code: { type: "string" },
                },
                required: ["name", "code"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Created" },
          "409": { description: "Duplicate code" },
        },
      },
    },
    "/api/medications/{id}": {
      get: {
        summary: "Get medication",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Medication" } },
      },
      patch: {
        summary: "Update medication (ADMIN)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Updated" } },
      },
      delete: {
        summary: "Soft-delete medication (ADMIN)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Deleted" } },
      },
    },
    "/api/requests": {
      get: {
        summary: "List active requests",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Array" } },
      },
      post: {
        summary: "Create request",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  clinicId: { type: "string" },
                  medicationId: { type: "string" },
                  quantity: { type: "integer" },
                  warehouseId: { type: "string" },
                },
                required: ["clinicId", "medicationId", "quantity"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Created" },
          "400": { description: "Validation error" },
        },
      },
    },
    "/api/requests/{id}/assign": {
      post: {
        summary: "Assign request to warehouse (ADMIN)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { warehouseId: { type: "string" } },
                required: ["warehouseId"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Assigned" },
          "400": { description: "Insufficient inventory" },
        },
      },
    },
    "/api/requests/{id}/status": {
      patch: {
        summary: "Update request status",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: [
                      "PENDING",
                      "ASSIGNED",
                      "APPROVED",
                      "REJECTED",
                      "CANCELLED",
                    ],
                  },
                },
                required: ["status"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Updated" },
          "400": { description: "Invalid status or inventory" },
        },
      },
    },
    "/api/requests/{id}": {
      patch: {
        summary: "Update request (ADMIN)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Updated" } },
      },
      delete: {
        summary: "Soft-delete request (ADMIN)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Deleted" } },
      },
    },
    "/api/seed": {
      post: {
        summary: "Upload JSON to seed DB (ADMIN)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: { file: { type: "string", format: "binary" } },
                required: ["file"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Seed executed" },
          "400": { description: "No file" },
        },
      },
    },
  },
};
