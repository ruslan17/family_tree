-- Семейное дерево
DROP TABLE IF EXISTS family_member CASCADE;
CREATE TABLE family_member (
  id                  SERIAL UNIQUE PRIMARY KEY,
  name                VARCHAR(255) NOT NULL,
  age                 INT,
  mother_id           INT REFERENCES family_member (id) ON DELETE CASCADE,
  father_id           INT REFERENCES family_member (id) ON DELETE CASCADE
);