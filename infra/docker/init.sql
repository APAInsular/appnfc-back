CREATE DATABASE app_test;
CREATE DATABASE app_backend;
CREATE USER app WITH PASSWORD 'secret';

\c app_test
GRANT ALL ON SCHEMA public TO app;
ALTER SCHEMA public OWNER TO app;

\c app_backend
GRANT ALL ON SCHEMA public TO app;
ALTER SCHEMA public OWNER TO app;