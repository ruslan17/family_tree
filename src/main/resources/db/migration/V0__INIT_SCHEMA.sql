-- Семейное дерево
DROP TABLE IF EXISTS family_member CASCADE;
CREATE TABLE family_member (
  id                  INT,
  name                VARCHAR(255) NOT NULL,
  age                 INT,
  mother_id           INT,
  father_id           INT
);