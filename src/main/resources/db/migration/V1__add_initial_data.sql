BEGIN TRANSACTION;

INSERT INTO family_member (id, name, surname, age, sex, mother, father)
VALUES
  (1, 'Lianna', 'Stark', 45, FALSE, NULL, NULL),
  (2, 'Ned', 'Stark', 47, TRUE, NULL, NULL),
  (3, 'John Snow', 'Stark', 25, TRUE, 1, 2);

COMMIT;