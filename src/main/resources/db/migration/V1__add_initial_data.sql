BEGIN TRANSACTION;

INSERT INTO family_member (id, name, surname, age, sex, mother, father)
VALUES
  (1, 'Lianna', 'Stark', 45, FALSE, 'Lina', 'Axe'),
  (2, 'Ned', 'Stark', 47, TRUE, 'Vindra', 'Sven'),
  (3, 'John Snow', 'Stark', 25, TRUE, 'Lianna', 'Ned');

COMMIT;