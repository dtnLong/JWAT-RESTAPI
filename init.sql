CREATE SCHEMA IF NOT EXISTS jwat;

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL primary key,
    customer_id int not null,
    created_date timestamptz,
    last_updated timestamptz,
    payment_type varchar(255),
    status varchar(225),
    total DECIMAL(14,2)
);