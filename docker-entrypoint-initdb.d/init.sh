#!/bin/bash
set -e

echo "Initializing database..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create user if not exists
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_user WHERE usename = '${APP_USER}') THEN
            CREATE USER ${APP_USER} WITH PASSWORD '${APP_PASSWORD}';
        END IF;
    END
    \$\$;

    -- Create database if not exists
    SELECT 'CREATE DATABASE ${APP_DB}'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${APP_DB}')\gexec

    -- Grant privileges to the custom user
    GRANT ALL PRIVILEGES ON DATABASE ${APP_DB} TO ${APP_USER};
EOSQL

# Connect to the app database to set schema permissions
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "${APP_DB}" <<-EOSQL
    -- Grant schema permissions
    GRANT ALL ON SCHEMA public TO ${APP_USER};
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${APP_USER};
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ${APP_USER};
EOSQL

echo "Database initialized!"
