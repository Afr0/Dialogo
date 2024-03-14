CREATE TABLE "Users" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text,
    password text,
    salt text,
    preferredLanguage integer,
    alphabetsKnown text
);