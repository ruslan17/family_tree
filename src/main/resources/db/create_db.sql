-- Создаем базу данных family_tree с пользователем express
CREATE USER express WITH PASSWORD 'admin';

DROP DATABASE IF EXISTS family_tree;
CREATE DATABASE family_tree;
GRANT ALL PRIVILEGES ON DATABASE family_tree TO express;