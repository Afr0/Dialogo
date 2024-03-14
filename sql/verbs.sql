CREATE TABLE "Verbs" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text,
    english text, /*JSON object containing verb forms */
    italian text, /*JSON object containing verb forms */
    russian text /* JSON object containing verb forms */
);