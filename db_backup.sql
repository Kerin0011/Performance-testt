-- riwimedicare backup (DDL + sample data)
-- Tables: users, clinics, warehouses, medications, inventories, requests

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- clinics
CREATE TABLE IF NOT EXISTS clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  nit VARCHAR(255) NOT NULL UNIQUE,
  contact VARCHAR(255),
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- warehouses
CREATE TABLE IF NOT EXISTS warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- medications
CREATE TABLE IF NOT EXISTS medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(255) NOT NULL UNIQUE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- inventories
CREATE TABLE IF NOT EXISTS inventories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouseId UUID NOT NULL,
  medicationId UUID NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- requests
CREATE TABLE IF NOT EXISTS requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinicId UUID NOT NULL,
  medicationId UUID NOT NULL,
  quantity INTEGER NOT NULL,
  warehouseId UUID,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Sample seed data (compatible with seeders)
-- Passwords are bcrypt('password123') placeholder; set real hashed passwords when restoring
INSERT INTO users (id, name, email, password, role, createdAt, updatedAt)
VALUES
  (gen_random_uuid(), 'Admin', 'admin@local', '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'ADMIN', NOW(), NOW()),
  (gen_random_uuid(), 'Manager', 'manager@local', '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'MANAGER', NOW(), NOW());

INSERT INTO clinics (id, name, nit, contact, deleted, createdAt, updatedAt)
VALUES
  (gen_random_uuid(), 'Clinic A', 'NIT-100', 'contact@a', FALSE, NOW(), NOW()),
  (gen_random_uuid(), 'Clinic B', 'NIT-200', 'contact@b', FALSE, NOW(), NOW());

INSERT INTO warehouses (id, name, location, deleted, createdAt, updatedAt)
VALUES
  (gen_random_uuid(), 'Main Warehouse', 'City Center', FALSE, NOW(), NOW());

INSERT INTO medications (id, name, code, deleted, createdAt, updatedAt)
VALUES
  (gen_random_uuid(), 'Paracetamol', 'MED-001', FALSE, NOW(), NOW()),
  (gen_random_uuid(), 'Ibuprofen', 'MED-002', FALSE, NOW(), NOW());

