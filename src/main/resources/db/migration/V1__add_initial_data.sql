BEGIN TRANSACTION;

--
INSERT INTO family_member (id, name, age, mother_id)
VALUES
  (1, 'Lianna', 45, NULL),
  (2, 'Ned', 47, NULL),
  (3, 'John Snow', 25, 1);

COMMIT;