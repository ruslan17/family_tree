CREATE USER admin WITH PASSWORD 'admin';

DROP DATABASE IF EXISTS family_database;
CREATE DATABASE family_database;
GRANT ALL PRIVILEGES ON DATABASE family_database TO admin;