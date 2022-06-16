\echo 'Delete and recreate vacation db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE vacation;
CREATE DATABASE vacation;
\connect vacation

\i vacation-schema.sql
-- \i vacation-seed.sql

-- \echo 'Delete and recreate vacation_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE vacation_test;
-- CREATE DATABASE vacation_test;
-- \connect vacation_test

\i vacation-schema.sql
