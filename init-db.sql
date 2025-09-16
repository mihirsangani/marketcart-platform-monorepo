-- Initialize MarketCart Database
-- This file is executed when the PostgreSQL container starts for the first time

-- Create database if it doesn't exist (this is handled by POSTGRES_DB env var)
-- CREATE DATABASE IF NOT EXISTS marketcart;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create initial tables (Prisma will handle this, but we can add custom tables here)
-- The Product table will be created by Prisma migrations

-- Insert sample data (optional)
-- This will be handled by Prisma seed script

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE marketcart TO marketcart_user;
