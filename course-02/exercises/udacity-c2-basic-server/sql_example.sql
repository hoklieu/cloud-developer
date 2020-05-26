DROP VIEW IF EXISTS joined;
DROP VIEW IF EXISTS toyotas;
DROP VIEW IF EXISTS "public"."make";
DROP VIEW IF EXISTS "public"."cars";

CREATE TABLE "public"."cars"
(
  id SERIAL PRIMARY KEY,
  type TEXT,
  model TEXT,
  cost INT,
  make_id INT
);

INSERT INTO "public"."cars"
  ("type", "model", "cost", "make_id")
VALUES
  ('sedan', 'roadster', '33', '2'),
  ('sedan', 'prius', '22', '1'),
  ('sedan', 'focus', '18', '3'),
  ('suv', 'highlander', '40', '1');

CREATE TABLE "public"."make"
(
  id SERIAL PRIMARY KEY,
  name TEXT
);

insert into "public"."make"
  ("name")
VALUES
  ('toyota'),
  ('tesla'),
  ('ford');

DROP VIEW IF EXISTS joined

CREATE VIEW joined
AS
  SELECT c.type, c.cost, c.model, m.name
  FROM cars as c
    INNER JOIN make as m ON (c.make_id = m.id)
  ORDER BY cost DESC  LIMIT 30;

CREATE VIEW toyotas
AS
SELECT c.type, c.cost, c.model, m.name
FROM cars as c
  INNER JOIN make as m ON
(c.make_id = m.id)
WHERE m.name = 'toyota'
ORDER BY c.cost
LIMIT 30;