-- Семейное дерево
DROP TABLE IF EXISTS family_member CASCADE;
CREATE TABLE family_member (
  id                  SERIAL UNIQUE PRIMARY KEY,
  name                VARCHAR(255) NOT NULL,
  surname             VARCHAR(255),
  age                 INT NOT NULL,
  sex                 BOOLEAN,
  mother              INT REFERENCES family_member (id) ON DELETE CASCADE,
  father              INT REFERENCES family_member (id) ON DELETE CASCADE
);

COMMENT ON TABLE family_member IS 'Таблица членов семьи';
COMMENT ON COLUMN family_member.id IS 'Идентификатор';
COMMENT ON COLUMN family_member.name IS 'Имя';
COMMENT ON COLUMN family_member.surname IS 'Фамилия';
COMMENT ON COLUMN family_member.sex IS 'Пол';
COMMENT ON COLUMN family_member.mother IS 'Мать';
COMMENT ON COLUMN family_member.father IS 'Отец';