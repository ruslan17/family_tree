BEGIN TRANSACTION;

--
INSERT INTO family_member (id, name, age, mother_id, father_id)
VALUES
  (1, 'John Snow', 25, 1, 1);

COMMIT;