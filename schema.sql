CREATE SCHEMA IF NOT EXISTS jwat;

CREATE TABLE IF NOT EXISTS jwat.orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    payment_type VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    total NUMERIC(14,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);